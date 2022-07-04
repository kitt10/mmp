from tornado.web import Application, RequestHandler, StaticFileHandler
from tornado.ioloop import IOLoop
from tornado.escape import json_decode
from os.path import join, dirname, isfile
from json import dumps as json_dumps, dump as json_dump, load as json_load
import numpy as np

class EP_Web(RequestHandler):

    def get(self):
        self.render('../deploy/index.html')
        
class EP_WebAdmin(RequestHandler):

    def get(self):
        self.render('../deploy/admin.html')

class EP_IsLaunched(RequestHandler):
    
    def get(self):
        self.write(json_dumps({'launched': isfile('../data/draw.json')}))
        
    def options(self):
        self.set_status(204)
        self.finish()

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.set_header("Access-Control-Request-Headers", "Content-Type")
        
class EP_Launch(RequestHandler):
    
    def initialize(self, webserver, worker):
        self.webserver = webserver
        self.worker = worker
    
    def post(self):
        query = json_decode(self.request.body)
        draw = query['draw']
        print('Got draw:', draw)
        with open('../data/draw.json', 'w', encoding='utf-8') as jfw:
            json_dump(draw, jfw)
        
        print('Draw written. Generating schedule...')
        
        self.worker.generate_schedule()
        
        self.write(json_dumps({'status': 'OK'}))
        
    def options(self):
        self.set_status(204)
        self.finish()

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.set_header("Access-Control-Request-Headers", "Content-Type")
        
class EP_Update(RequestHandler):

    def initialize(self, webserver, worker):
        self.webserver = webserver
        self.worker = worker

    def post(self):
        query = json_decode(self.request.body)
        print(query)
        error = False
        self.write('ERR: '+error if error else 'OK')
        
    def options(self):
        self.set_status(204)
        self.finish()

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.set_header("Access-Control-Request-Headers", "Content-Type")
           
class WebServer:
    
    def __init__(self, worker, port, rel_static_path, verbose):
        self.worker = worker
        self.port = port
        self.rel_static_path = rel_static_path
        self.static_path = join(dirname(__file__), self.rel_static_path)
        self.verbose = verbose
        
        urls = [('/', EP_Web),
                (r'/admin', EP_WebAdmin),
                ('/islaunched/', EP_IsLaunched),
                ('/launch/', EP_Launch, {'webserver': self, 'worker': self.worker}),
                ('/update/', EP_Update, {'webserver': self, 'worker': self.worker}),
                ('/(.*)', StaticFileHandler, {'path': self.static_path})]

        settings = {
                'debug': True, 
                'autoreload': True}

        app = Application(urls, **settings)
        app.listen(self.port)

        self.log('Starting server, port: '+str(self.port))
        IOLoop.current().start()

    def log(self, buf):
        if self.verbose:
            print('SERVER LOG:', buf)
                 
class Worker:
    
    def __init__(self, base_static_path):
        self.base_static_path = base_static_path
    
    def generate_schedule(self):
        print('[LOG] Generating schedule...')
        
        groups = ('A', 'B')

        with open('../data/key.json') as f:  
            keys = json_load(f)

        with open('../data/draw.json') as f:  
            draw = json_load(f)

        schedule = dict((g, list()) for g in groups)

        for g in groups:
            n = len(draw[g])
            key = keys[str(n)]
            for ik, k in enumerate(key):
                t1_ind = int(k[0])-1
                t2_ind = int(k[1])-1
                
                match = dict()
                match['nb'] = ik+1
                match['teamHome'] = draw[g][t1_ind]
                match['teamAway'] = draw[g][t2_ind]
                match['finished'] = False
                match['scoreHome'] = 0
                match['scoreAway'] = 0
                match['estimatedStart'] = ''
                match['pointsHome'] = []
                match['pointsAway'] = []
                schedule[g].append(match)

        with open('../data/schedule.json', 'w') as f:
            json_dump(schedule, f)

        print('[LOG] Schedule generated.')
    
    

if __name__ == '__main__':

    SERVER_PORT = 6009
    RELATIVE_STATIC_PATH = '../deploy'
    
    worker = Worker(base_static_path=RELATIVE_STATIC_PATH)

    # Init and Run WebServer
    WebServer(worker=worker,
              port=SERVER_PORT, 
              rel_static_path=RELATIVE_STATIC_PATH, 
              verbose=True)