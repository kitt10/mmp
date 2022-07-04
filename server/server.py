from tornado.web import Application, RequestHandler, StaticFileHandler
from tornado.ioloop import IOLoop
from tornado.escape import json_decode
from os.path import join, dirname
import numpy as np
import json

class EP_Web(RequestHandler):

    def get(self):
        self.render('../deploy/index.html')
        
class EP_WebAdmin(RequestHandler):

    def get(self):
        self.render('../deploy/admin.html')

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
    
    def update(self, data):
        print('[LOG] Updated.')
        return ''
    

if __name__ == '__main__':

    SERVER_PORT = 6009
    RELATIVE_STATIC_PATH = '../deploy'
    
    worker = Worker(base_static_path=RELATIVE_STATIC_PATH)

    # Init and Run WebServer
    WebServer(worker=worker,
              port=SERVER_PORT, 
              rel_static_path=RELATIVE_STATIC_PATH, 
              verbose=True)