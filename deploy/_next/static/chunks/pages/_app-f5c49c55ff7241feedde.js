(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{1859:function(e,t,r){"use strict";r.d(t,{Z:function(){return re}});var n=r(1526),a=Math.abs,o=String.fromCharCode;function s(e){return e.trim()}function c(e,t,r){return e.replace(t,r)}function i(e,t){return e.indexOf(t)}function u(e,t){return 0|e.charCodeAt(t)}function f(e,t,r){return e.slice(t,r)}function l(e){return e.length}function m(e){return e.length}function d(e,t){return t.push(e),e}var p=1,y=1,h=0,v=0,g=0,b="";function w(e,t,r,n,a,o,s){return{value:e,root:t,parent:r,type:n,props:a,children:o,line:p,column:y,length:s,return:""}}function P(e,t,r){return w(e,t.root,t.parent,r,t.props,t.children,0)}function A(){return g=v>0?u(b,--v):0,y--,10===g&&(y=1,p--),g}function S(){return g=v<h?u(b,v++):0,y++,10===g&&(y=1,p++),g}function O(){return u(b,v)}function x(){return v}function k(e,t){return f(b,e,t)}function H(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function j(e){return p=y=1,h=l(b=e),v=0,[]}function $(e){return b="",e}function C(e){return s(k(v-1,Z(91===e?e+2:40===e?e+1:e)))}function E(e){for(;(g=O())&&g<33;)S();return H(e)>2||H(g)>3?"":" "}function _(e,t){for(;--t&&S()&&!(g<48||g>102||g>57&&g<65||g>70&&g<97););return k(e,x()+(t<6&&32==O()&&32==S()))}function Z(e){for(;S();)switch(g){case e:return v;case 34:case 39:return Z(34===e||39===e?e:g);case 40:41===e&&Z(e);break;case 92:S()}return v}function M(e,t){for(;S()&&e+g!==57&&(e+g!==84||47!==O()););return"/*"+k(t,v-1)+"*"+o(47===e?e:S())}function T(e){for(;!H(O());)S();return k(e,v)}var N="-ms-",D="-moz-",R="-webkit-",I="comm",L="rule",F="decl";function z(e,t){for(var r="",n=m(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function G(e,t,r,n){switch(e.type){case"@import":case F:return e.return=e.return||e.value;case I:return"";case L:e.value=e.props.join(",")}return l(r=z(e.children,n))?e.return=e.value+"{"+r+"}":""}function U(e,t){switch(function(e,t){return(((t<<2^u(e,0))<<2^u(e,1))<<2^u(e,2))<<2^u(e,3)}(e,t)){case 5103:return R+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return R+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return R+e+D+e+N+e+e;case 6828:case 4268:return R+e+N+e+e;case 6165:return R+e+N+"flex-"+e+e;case 5187:return R+e+c(e,/(\w+).+(:[^]+)/,"-webkit-box-$1$2-ms-flex-$1$2")+e;case 5443:return R+e+N+"flex-item-"+c(e,/flex-|-self/,"")+e;case 4675:return R+e+N+"flex-line-pack"+c(e,/align-content|flex-|-self/,"")+e;case 5548:return R+e+N+c(e,"shrink","negative")+e;case 5292:return R+e+N+c(e,"basis","preferred-size")+e;case 6060:return R+"box-"+c(e,"-grow","")+R+e+N+c(e,"grow","positive")+e;case 4554:return R+c(e,/([^-])(transform)/g,"$1-webkit-$2")+e;case 6187:return c(c(c(e,/(zoom-|grab)/,R+"$1"),/(image-set)/,R+"$1"),e,"")+e;case 5495:case 3959:return c(e,/(image-set\([^]*)/,R+"$1$`$1");case 4968:return c(c(e,/(.+:)(flex-)?(.*)/,"-webkit-box-pack:$3-ms-flex-pack:$3"),/s.+-b[^;]+/,"justify")+R+e+e;case 4095:case 3583:case 4068:case 2532:return c(e,/(.+)-inline(.+)/,R+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(l(e)-1-t>6)switch(u(e,t+1)){case 109:if(45!==u(e,t+4))break;case 102:return c(e,/(.+:)(.+)-([^]+)/,"$1-webkit-$2-$3$1"+D+(108==u(e,t+3)?"$3":"$2-$3"))+e;case 115:return~i(e,"stretch")?U(c(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==u(e,t+1))break;case 6444:switch(u(e,l(e)-3-(~i(e,"!important")&&10))){case 107:return c(e,":",":"+R)+e;case 101:return c(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+R+(45===u(e,14)?"inline-":"")+"box$3$1"+R+"$2$3$1"+N+"$2box$3")+e}break;case 5936:switch(u(e,t+11)){case 114:return R+e+N+c(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return R+e+N+c(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return R+e+N+c(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return R+e+N+e+e}return e}function B(e){return $(W("",null,null,null,[""],e=j(e),0,[0],e))}function W(e,t,r,n,a,s,i,u,f){for(var m=0,p=0,y=i,h=0,v=0,g=0,b=1,w=1,P=1,k=0,H="",j=a,$=s,Z=n,N=H;w;)switch(g=k,k=S()){case 34:case 39:case 91:case 40:N+=C(k);break;case 9:case 10:case 13:case 32:N+=E(g);break;case 92:N+=_(x()-1,7);continue;case 47:switch(O()){case 42:case 47:d(X(M(S(),x()),t,r),f);break;default:N+="/"}break;case 123*b:u[m++]=l(N)*P;case 125*b:case 59:case 0:switch(k){case 0:case 125:w=0;case 59+p:v>0&&l(N)-y&&d(v>32?J(N+";",n,r,y-1):J(c(N," ","")+";",n,r,y-2),f);break;case 59:N+=";";default:if(d(Z=q(N,t,r,m,p,a,u,H,j=[],$=[],y),s),123===k)if(0===p)W(N,t,Z,Z,j,s,y,u,$);else switch(h){case 100:case 109:case 115:W(e,Z,Z,n&&d(q(e,Z,Z,0,0,a,u,H,a,j=[],y),$),a,$,y,u,n?j:$);break;default:W(N,Z,Z,Z,[""],$,y,u,$)}}m=p=v=0,b=P=1,H=N="",y=i;break;case 58:y=1+l(N),v=g;default:if(b<1)if(123==k)--b;else if(125==k&&0==b++&&125==A())continue;switch(N+=o(k),k*b){case 38:P=p>0?1:(N+="\f",-1);break;case 44:u[m++]=(l(N)-1)*P,P=1;break;case 64:45===O()&&(N+=C(S())),h=O(),p=l(H=N+=T(x())),k++;break;case 45:45===g&&2==l(N)&&(b=0)}}return s}function q(e,t,r,n,o,i,u,l,d,p,y){for(var h=o-1,v=0===o?i:[""],g=m(v),b=0,P=0,A=0;b<n;++b)for(var S=0,O=f(e,h+1,h=a(P=u[b])),x=e;S<g;++S)(x=s(P>0?v[S]+" "+O:c(O,/&\f/g,v[S])))&&(d[A++]=x);return w(e,t,r,0===o?L:l,d,p,y)}function X(e,t,r){return w(e,t,r,I,o(g),f(e,2,-2),0)}function J(e,t,r,n){return w(e,t,r,F,f(e,0,n),f(e,n+1,-1),n)}var V=function(e,t,r){for(var n=0,a=0;n=a,a=O(),38===n&&12===a&&(t[r]=1),!H(a);)S();return k(e,v)},Y=function(e,t){return $(function(e,t){var r=-1,n=44;do{switch(H(n)){case 0:38===n&&12===O()&&(t[r]=1),e[r]+=V(v-1,t,r);break;case 2:e[r]+=C(n);break;case 4:if(44===n){e[++r]=58===O()?"&\f":"",t[r]=e[r].length;break}default:e[r]+=o(n)}}while(n=S());return e}(j(e),t))},K=new WeakMap,Q=function(e){if("rule"===e.type&&e.parent&&e.length){for(var t=e.value,r=e.parent,n=e.column===r.column&&e.line===r.line;"rule"!==r.type;)if(!(r=r.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||K.get(r))&&!n){K.set(e,!0);for(var a=[],o=Y(t,a),s=r.props,c=0,i=0;c<o.length;c++)for(var u=0;u<s.length;u++,i++)e.props[i]=a[c]?o[c].replace(/&\f/g,s[u]):s[u]+" "+o[c]}}},ee=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}},te=[function(e,t,r,n){if(!e.return)switch(e.type){case F:e.return=U(e.value,e.length);break;case"@keyframes":return z([P(c(e.value,"@","@"+R),e,"")],n);case L:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=t.exec(e))?e[0]:e}(t,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return z([P(c(t,/:(read-\w+)/,":-moz-$1"),e,"")],n);case"::placeholder":return z([P(c(t,/:(plac\w+)/,":-webkit-input-$1"),e,""),P(c(t,/:(plac\w+)/,":-moz-$1"),e,""),P(c(t,/:(plac\w+)/,N+"input-$1"),e,"")],n)}return""}))}}],re=function(e){var t=e.key;if("css"===t){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var a=e.stylisPlugins||te;var o,s,c={},i=[];o=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),r=1;r<t.length;r++)c[t[r]]=!0;i.push(e)}));var u,f,l=[G,(f=function(e){u.insert(e)},function(e){e.root||(e=e.return)&&f(e)})],d=function(e){var t=m(e);return function(r,n,a,o){for(var s="",c=0;c<t;c++)s+=e[c](r,n,a,o)||"";return s}}([Q,ee].concat(a,l));s=function(e,t,r,n){u=r,z(B(e?e+"{"+t.styles+"}":t.styles),d),n&&(p.inserted[t.name]=!0)};var p={key:t,sheet:new n.m({key:t,container:o,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend}),nonce:e.nonce,inserted:c,registered:{},insert:s};return p.sheet.hydrate(i),p}},7866:function(e,t){"use strict";t.Z=function(e){var t=Object.create(null);return function(r){return void 0===t[r]&&(t[r]=e(r)),t[r]}}},4759:function(e,t,r){"use strict";r.d(t,{E:function(){return d},T:function(){return f},c:function(){return m},h:function(){return c},w:function(){return u}});var n=r(7294),a=r(1859),o=r(444),s=r(4199),c=Object.prototype.hasOwnProperty,i=(0,n.createContext)("undefined"!==typeof HTMLElement?(0,a.Z)({key:"css"}):null);i.Provider;var u=function(e){return(0,n.forwardRef)((function(t,r){var a=(0,n.useContext)(i);return e(t,a,r)}))},f=(0,n.createContext)({});var l="__EMOTION_TYPE_PLEASE_DO_NOT_USE__",m=function(e,t){var r={};for(var n in t)c.call(t,n)&&(r[n]=t[n]);return r[l]=e,r},d=u((function(e,t,r){var a=e.css;"string"===typeof a&&void 0!==t.registered[a]&&(a=t.registered[a]);var i=e[l],u=[a],m="";"string"===typeof e.className?m=(0,o.f)(t.registered,u,e.className):null!=e.className&&(m=e.className+" ");var d=(0,s.O)(u,void 0,(0,n.useContext)(f));(0,o.M)(t,d,"string"===typeof i);m+=t.key+"-"+d.name;var p={};for(var y in e)c.call(e,y)&&"css"!==y&&y!==l&&(p[y]=e[y]);return p.ref=r,p.className=m,(0,n.createElement)(i,p)}))},917:function(e,t,r){"use strict";r.d(t,{xB:function(){return i},iv:function(){return u}});var n=r(7294),a=(r(1859),r(4759)),o=(r(8679),r(444)),s=r(4199),c=r(1526),i=(0,a.w)((function(e,t){var r=e.styles,i=(0,s.O)([r],void 0,(0,n.useContext)(a.T)),u=(0,n.useRef)();return(0,n.useLayoutEffect)((function(){var e=t.key+"-global",r=new c.m({key:e,nonce:t.sheet.nonce,container:t.sheet.container,speedy:t.sheet.isSpeedy}),n=!1,a=document.querySelector('style[data-emotion="'+e+" "+i.name+'"]');return t.sheet.tags.length&&(r.before=t.sheet.tags[0]),null!==a&&(n=!0,a.setAttribute("data-emotion",e),r.hydrate([a])),u.current=[r,n],function(){r.flush()}}),[t]),(0,n.useLayoutEffect)((function(){var e=u.current,r=e[0];if(e[1])e[1]=!1;else{if(void 0!==i.next&&(0,o.M)(t,i.next,!0),r.tags.length){var n=r.tags[r.tags.length-1].nextElementSibling;r.before=n,r.flush()}t.insert("",i,r,!1)}}),[t,i.name]),null}));function u(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.O)(t)}},5944:function(e,t,r){"use strict";r.d(t,{tZ:function(){return o},BX:function(){return s}});r(7294),r(1859);var n=r(4759),a=(r(8679),r(4199),r(5893));a.Fragment;function o(e,t,r){return n.h.call(t,"css")?(0,a.jsx)(n.E,(0,n.c)(e,t),r):(0,a.jsx)(e,t,r)}function s(e,t,r){return n.h.call(t,"css")?(0,a.jsxs)(n.E,(0,n.c)(e,t),r):(0,a.jsxs)(e,t,r)}},4199:function(e,t,r){"use strict";r.d(t,{O:function(){return y}});var n=function(e){for(var t,r=0,n=0,a=e.length;a>=4;++n,a-=4)t=1540483477*(65535&(t=255&e.charCodeAt(n)|(255&e.charCodeAt(++n))<<8|(255&e.charCodeAt(++n))<<16|(255&e.charCodeAt(++n))<<24))+(59797*(t>>>16)<<16),r=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&r)+(59797*(r>>>16)<<16);switch(a){case 3:r^=(255&e.charCodeAt(n+2))<<16;case 2:r^=(255&e.charCodeAt(n+1))<<8;case 1:r=1540483477*(65535&(r^=255&e.charCodeAt(n)))+(59797*(r>>>16)<<16)}return(((r=1540483477*(65535&(r^=r>>>13))+(59797*(r>>>16)<<16))^r>>>15)>>>0).toString(36)},a={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},o=r(7866),s=/[A-Z]|^ms/g,c=/_EMO_([^_]+?)_([^]*?)_EMO_/g,i=function(e){return 45===e.charCodeAt(1)},u=function(e){return null!=e&&"boolean"!==typeof e},f=(0,o.Z)((function(e){return i(e)?e:e.replace(s,"-$&").toLowerCase()})),l=function(e,t){switch(e){case"animation":case"animationName":if("string"===typeof t)return t.replace(c,(function(e,t,r){return d={name:t,styles:r,next:d},t}))}return 1===a[e]||i(e)||"number"!==typeof t||0===t?t:t+"px"};function m(e,t,r){if(null==r)return"";if(void 0!==r.__emotion_styles)return r;switch(typeof r){case"boolean":return"";case"object":if(1===r.anim)return d={name:r.name,styles:r.styles,next:d},r.name;if(void 0!==r.styles){var n=r.next;if(void 0!==n)for(;void 0!==n;)d={name:n.name,styles:n.styles,next:d},n=n.next;return r.styles+";"}return function(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=m(e,t,r[a])+";";else for(var o in r){var s=r[o];if("object"!==typeof s)null!=t&&void 0!==t[s]?n+=o+"{"+t[s]+"}":u(s)&&(n+=f(o)+":"+l(o,s)+";");else if(!Array.isArray(s)||"string"!==typeof s[0]||null!=t&&void 0!==t[s[0]]){var c=m(e,t,s);switch(o){case"animation":case"animationName":n+=f(o)+":"+c+";";break;default:n+=o+"{"+c+"}"}}else for(var i=0;i<s.length;i++)u(s[i])&&(n+=f(o)+":"+l(o,s[i])+";")}return n}(e,t,r);case"function":if(void 0!==e){var a=d,o=r(e);return d=a,m(e,t,o)}break;case"string":}if(null==t)return r;var s=t[r];return void 0!==s?s:r}var d,p=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var y=function(e,t,r){if(1===e.length&&"object"===typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var a=!0,o="";d=void 0;var s=e[0];null==s||void 0===s.raw?(a=!1,o+=m(r,t,s)):o+=s[0];for(var c=1;c<e.length;c++)o+=m(r,t,e[c]),a&&(o+=s[c]);p.lastIndex=0;for(var i,u="";null!==(i=p.exec(o));)u+="-"+i[1];return{name:n(o)+u,styles:o,next:d}}},1526:function(e,t,r){"use strict";r.d(t,{m:function(){return n}});var n=function(){function e(e){var t=this;this._insertTag=function(e){var r;r=0===t.tags.length?t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,r),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var r=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{r.insertRule(e,r.cssRules.length)}catch(n){0}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}()},444:function(e,t,r){"use strict";r.d(t,{f:function(){return n},M:function(){return a}});function n(e,t,r){var n="";return r.split(" ").forEach((function(r){void 0!==e[r]?t.push(e[r]+";"):n+=r+" "})),n}var a=function(e,t,r){var n=e.key+"-"+t.name;if(!1===r&&void 0===e.registered[n]&&(e.registered[n]=t.styles),void 0===e.inserted[t.name]){var a=t;do{e.insert(t===a?"."+n:"",a,e.sheet,!0);a=a.next}while(void 0!==a)}}},8679:function(e,t,r){"use strict";var n=r(1296),a={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},s={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},c={};function i(e){return n.isMemo(e)?s:c[e.$$typeof]||a}c[n.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},c[n.Memo]=s;var u=Object.defineProperty,f=Object.getOwnPropertyNames,l=Object.getOwnPropertySymbols,m=Object.getOwnPropertyDescriptor,d=Object.getPrototypeOf,p=Object.prototype;e.exports=function e(t,r,n){if("string"!==typeof r){if(p){var a=d(r);a&&a!==p&&e(t,a,n)}var s=f(r);l&&(s=s.concat(l(r)));for(var c=i(t),y=i(r),h=0;h<s.length;++h){var v=s[h];if(!o[v]&&(!n||!n[v])&&(!y||!y[v])&&(!c||!c[v])){var g=m(r,v);try{u(t,v,g)}catch(b){}}}}return t}},6103:function(e,t){"use strict";var r="function"===typeof Symbol&&Symbol.for,n=r?Symbol.for("react.element"):60103,a=r?Symbol.for("react.portal"):60106,o=r?Symbol.for("react.fragment"):60107,s=r?Symbol.for("react.strict_mode"):60108,c=r?Symbol.for("react.profiler"):60114,i=r?Symbol.for("react.provider"):60109,u=r?Symbol.for("react.context"):60110,f=r?Symbol.for("react.async_mode"):60111,l=r?Symbol.for("react.concurrent_mode"):60111,m=r?Symbol.for("react.forward_ref"):60112,d=r?Symbol.for("react.suspense"):60113,p=r?Symbol.for("react.suspense_list"):60120,y=r?Symbol.for("react.memo"):60115,h=r?Symbol.for("react.lazy"):60116,v=r?Symbol.for("react.block"):60121,g=r?Symbol.for("react.fundamental"):60117,b=r?Symbol.for("react.responder"):60118,w=r?Symbol.for("react.scope"):60119;function P(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case f:case l:case o:case c:case s:case d:return e;default:switch(e=e&&e.$$typeof){case u:case m:case h:case y:case i:return e;default:return t}}case a:return t}}}function A(e){return P(e)===l}t.AsyncMode=f,t.ConcurrentMode=l,t.ContextConsumer=u,t.ContextProvider=i,t.Element=n,t.ForwardRef=m,t.Fragment=o,t.Lazy=h,t.Memo=y,t.Portal=a,t.Profiler=c,t.StrictMode=s,t.Suspense=d,t.isAsyncMode=function(e){return A(e)||P(e)===f},t.isConcurrentMode=A,t.isContextConsumer=function(e){return P(e)===u},t.isContextProvider=function(e){return P(e)===i},t.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===n},t.isForwardRef=function(e){return P(e)===m},t.isFragment=function(e){return P(e)===o},t.isLazy=function(e){return P(e)===h},t.isMemo=function(e){return P(e)===y},t.isPortal=function(e){return P(e)===a},t.isProfiler=function(e){return P(e)===c},t.isStrictMode=function(e){return P(e)===s},t.isSuspense=function(e){return P(e)===d},t.isValidElementType=function(e){return"string"===typeof e||"function"===typeof e||e===o||e===l||e===c||e===s||e===d||e===p||"object"===typeof e&&null!==e&&(e.$$typeof===h||e.$$typeof===y||e.$$typeof===i||e.$$typeof===u||e.$$typeof===m||e.$$typeof===g||e.$$typeof===b||e.$$typeof===w||e.$$typeof===v)},t.typeOf=P},1296:function(e,t,r){"use strict";e.exports=r(6103)},5077:function(e,t,r){"use strict";r.d(t,{R$:function(){return a},gj:function(){return o},db:function(){return s},fq:function(){return i}});var n=r(7294),a={name:"",matches:0,goalsPlus:0,goalsMinus:0,goalsDiff:0,points:0,upPosition:!1,scalps:[]},o={name:"",team:{},goals:0,assists:0,matches:0,points:0,meanPoints:0},s={A:1,B:1,C:1,D:1,P1:1,P2:1},c=(0,n.createContext)({}),i=function(){return(0,n.useContext)(c)};t.ZP=c},950:function(e,t,r){"use strict";r.d(t,{H:function(){return o}});var n=r(7294),a=(0,n.createContext)({}),o=function(){return(0,n.useContext)(a)};t.Z=a},3937:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return E}});var n=r(2809),a=r(266),o=r(809),s=r.n(o),c=r(917),i=r(950),u=r(5077),f=r(7294);var l=["magenta","lime","orange"],m=["A","B","C"],d={primary:"#00008b",secondary:"#eeeeee",blond:"#ffffff",dark:"#000000",highlight:"#f7edad",gray:"#dddddd",inverse:"#800000",green:"#008000"},p={headerHeight:"70px",menuHeight:"50px"},y={name:"di7045",styles:"display:flex;flex-direction:column;min-width:100vh;min-height:100vh;max-height:100vh;overflow:hidden;align-items:center;justify-content:flex-start"},h=(0,c.iv)("html{background:black;}body{min-width:100vh;min-height:100vh;margin:0 auto;background:",d.secondary,";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;}a{color:inherit;text-decoration:none;}",""),v=function(){var e=(0,a.Z)(s().mark((function e(t,r){var n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{method:"GET"});case 2:if(n=e.sent,!r){e.next=7;break}return e.next=6,n.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),g=function(){var e=(0,a.Z)(s().mark((function e(t,r){var n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{method:"POST",body:JSON.stringify(r)});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),b="http://localhost:6009",w=function(){var e=(0,f.useState)(!1),t=e[0],r=e[1],n=(0,f.useState)(!1),o=n[0],c=n[1],i={isMobile:t,setIsMobile:r},u=function(){var e=(0,a.Z)(s().mark((function e(t,r,n){var o;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o={section:t,nb:r,match:n},e.next=3,g(b+"/update/",o).then(function(){var e=(0,a.Z)(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Schedule updated.",t.status);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(){console.log("Unable to update the schedule.")}));case 3:case"end":return e.stop()}}),e)})));return function(t,r,n){return e.apply(this,arguments)}}();return{style:{globalStyle:h,pageS:y,colors:d,view:p,COLORS:l,LETTERS:m},device:i,gameLaunched:o,launchGame:function(){var e=(0,a.Z)(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(b+"/launch/",{draw:t}).then(function(){var e=(0,a.Z)(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Tournament launched.",t.status);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(){console.log("Unable to launch the game.")}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),updateSchedule:u,setGameLaunched:c}},P=r(318);function A(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"===typeof e)return S(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return S(e,t)}(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,c=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return s=e.done,e},e:function(e){c=!0,o=e},f:function(){try{s||null==r.return||r.return()}finally{if(c)throw o}}}}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function x(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var k=function(e){var t=(0,f.useState)(!1),r=t[0],n=t[1],o=(0,f.useState)({}),c=o[0],i=o[1],l=(0,f.useState)([]),m=l[0],d=l[1],p=(0,f.useState)(u.db),y=p[0],h=(p[1],(0,f.useState)({})),g=h[0],w=h[1],S=(0,f.useState)({}),O=S[0],k=S[1],H=(0,f.useState)({}),j=H[0],$=H[1],C=function(){var e=(0,a.Z)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(b+"/schedule/",!0).then(function(){var e=(0,a.Z)(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i(t.schedule);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(){console.log("Unable to fetch schedule data."),i({})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,f.useEffect)((function(){Object.keys(c).length>0?(d(Object.keys(c)),n(!0)):n(!1)}),[c]),(0,f.useEffect)((function(){r&&m.length>0&&function(){console.log("Computing stats...");for(var e=Object.fromEntries(m.map((function(e){return[e,{}]}))),t={},r=0,n=Object.entries(c);r<n.length;r++)for(var a=(0,P.Z)(n[r],2),o=a[0],s=a[1],i=0,f=Object.entries(s);i<f.length;i++){var l=(0,P.Z)(f[i],2),d=(l[0],l[1]);Object.keys(e[o]).includes(d.teamHome)||(e[o][d.teamHome]=x(x({},u.R$),{},{name:d.teamHome})),Object.keys(e[o]).includes(d.teamAway)||(e[o][d.teamAway]=x(x({},u.R$),{},{name:d.teamAway}));for(var p=0,y=Object.keys(d.pointsHome);p<y.length;p++){var h=y[p];Object.keys(t).includes(h)||(t[h]=x(x({},u.gj),{},{name:h.split("-")[0],team:e[o][d.teamHome]}))}for(var v=0,g=Object.keys(d.pointsAway);v<g.length;v++){var b=g[v];Object.keys(t).includes(b)||(t[b]=x(x({},u.gj),{},{name:b.split("-")[0],team:e[o][d.teamAway]}))}}for(var A=0,S=Object.entries(c);A<S.length;A++)for(var O=(0,P.Z)(S[A],2),k=O[0],H=O[1],j=0,C=Object.entries(H);j<C.length;j++){var E=(0,P.Z)(C[j],2),_=(E[0],E[1]);if(_.finished){e[k][_.teamHome].goalsPlus+=_.scoreHome,e[k][_.teamHome].goalsMinus+=_.scoreAway,e[k][_.teamHome].goalsDiff=e[k][_.teamHome].goalsPlus-e[k][_.teamHome].goalsMinus,e[k][_.teamHome].matches+=1,e[k][_.teamHome].points+=_.scoreHome>_.scoreAway?3:_.scoreHome==_.scoreAway?1:0,e[k][_.teamAway].goalsPlus+=_.scoreAway,e[k][_.teamAway].goalsMinus+=_.scoreHome,e[k][_.teamAway].goalsDiff=e[k][_.teamAway].goalsPlus-e[k][_.teamAway].goalsMinus,e[k][_.teamAway].matches+=1,e[k][_.teamAway].points+=_.scoreAway>_.scoreHome?3:_.scoreAway==_.scoreHome?1:0,_.scoreHome>_.scoreAway?e[k][_.teamHome].scalps.push(_.teamAway):_.scoreAway>_.scoreHome&&e[k][_.teamAway].scalps.push(_.teamHome);for(var Z=0,M=Object.keys(_.pointsHome);Z<M.length;Z++){var T=M[Z];t[T].goals+=_.pointsHome[T].goals,t[T].assists+=_.pointsHome[T].assists}for(var N=0,D=Object.keys(_.pointsAway);N<D.length;N++){var R=D[N];t[R].goals+=_.pointsAway[R].goals,t[R].assists+=_.pointsAway[R].assists}for(var I=0,L=Object.entries(t);I<L.length;I++){var F=(0,P.Z)(L[I],2),z=F[0],G=F[1];(z.includes("-"+_.teamHome)||z.includes("-"+_.teamAway))&&(G.matches+=1)}}}for(var U=0,B=Object.values(t);U<B.length;U++){var W=B[U];W.points=W.goals+W.assists,W.meanPoints=W.points/W.matches}w(e),$(t)}()}),[m,r]),(0,f.useEffect)((function(){var e,t={},r=A(m);try{for(r.s();!(e=r.n()).done;){var n=e.value;n.includes("P")||(t[n]=Object.values(g[n]).sort((function(e,t){return e.points>t.points?-1:e.points==t.points?e.scalps.includes(t.name)?-1:t.scalps.includes(e.name)?1:e.goalsDiff>t.goalsDiff?-1:e.goalsDiff<t.goalsDiff?1:e.goalsPlus>t.goalsPlus?-1:1:1})))}}catch(a){r.e(a)}finally{r.f()}k(t)}),[g]);var E=function(e){for(var t=0,r=Object.values(c[e]);t<r.length;t++){if(!r[t].finished)return!1}return!0};return(0,f.useEffect)((function(){if(Object.keys(O).length>0){var t,n=A(m.filter((function(e){return!e.includes("P")})));try{for(n.s();!(t=n.n()).done;){var a=t.value;if(a in O&&E(a))for(var o=0,s=["P1","P2"];o<s.length;o++){var i,u=s[o],f=A(Object.values(c[u]).filter((function(e){return e.id.includes("Osm")})));try{for(f.s();!(i=f.n()).done;){var l=i.value,d=x({},l),p=!1;if(l.teamHome.includes(a)){var y=+l.teamAway.substring(1,2)-1;y<O[a].length?d.teamHome=O[a][y].name:d.teamHome="<free-to-go>",p=!0}if(l.teamAway.includes(a)){var h=+l.teamAway.substring(1,2)-1;h<O[a].length?d.teamAway=O[a][h].name:d.teamAway="<free-to-go>",p=!0}p&&e.updateSchedule(u,d.nb,d)}}catch(D){f.e(D)}finally{f.f()}}}}catch(D){n.e(D)}finally{n.f()}}if(r){if(c.P1[1].finished&&"?"==c.P1[5].teamHome){var v=c.P1[1].scoreHome>c.P1[1].scoreAway?c.P1[1].teamHome:c.P1[1].teamAway;e.updateSchedule("P1",5,x(x({},c.P1[5]),{},{teamHome:v}))}if(c.P1[2].finished&&"?"==c.P1[6].teamHome){var g=c.P1[2].scoreHome>c.P1[2].scoreAway?c.P1[2].teamHome:c.P1[2].teamAway;e.updateSchedule("P1",6,x(x({},c.P1[6]),{},{teamHome:g}))}if(c.P2[1].finished&&"?"==c.P2[5].teamHome){var b=c.P2[1].scoreHome>c.P2[1].scoreAway?c.P2[1].teamHome:c.P2[1].teamAway;e.updateSchedule("P2",5,x(x({},c.P2[5]),{},{teamHome:b}))}if(c.P2[2].finished&&"?"==c.P2[6].teamHome){var w=c.P2[2].scoreHome>c.P2[2].scoreAway?c.P2[2].teamHome:c.P2[2].teamAway;e.updateSchedule("P2",6,x(x({},c.P2[6]),{},{teamHome:w}))}if(c.P1[3].finished&&"?"==c.P2[6].teamAway){var P=c.P1[3].scoreHome>c.P1[3].scoreAway?c.P1[3].teamHome:c.P1[3].teamAway;e.updateSchedule("P2",6,x(x({},c.P2[6]),{},{teamAway:P}))}if(c.P1[4].finished&&"?"==c.P2[5].teamAway){var S=c.P1[4].scoreHome>c.P1[4].scoreAway?c.P1[4].teamHome:c.P1[4].teamAway;e.updateSchedule("P2",5,x(x({},c.P2[5]),{},{teamAway:S}))}if(c.P2[3].finished&&"?"==c.P1[6].teamAway){var k=c.P2[3].scoreHome>c.P2[3].scoreAway?c.P2[3].teamHome:c.P2[3].teamAway;e.updateSchedule("P1",6,x(x({},c.P1[6]),{},{teamAway:k}))}if(c.P2[4].finished&&"?"==c.P1[5].teamAway){var H=c.P2[4].scoreHome>c.P2[4].scoreAway?c.P2[4].teamHome:c.P2[4].teamAway;e.updateSchedule("P1",5,x(x({},c.P1[5]),{},{teamAway:H}))}if(c.P1[5].finished&&"?"==c.P1[7].teamHome){var j=c.P1[5].scoreHome>c.P1[5].scoreAway?c.P1[5].teamHome:c.P1[5].teamAway;e.updateSchedule("P1",7,x(x({},c.P1[7]),{},{teamHome:j}))}if(c.P1[6].finished&&"?"==c.P2[7].teamHome){var $=c.P1[6].scoreHome>c.P1[6].scoreAway?c.P1[6].teamHome:c.P1[6].teamAway;e.updateSchedule("P2",7,x(x({},c.P2[7]),{},{teamHome:$}))}if(c.P2[5].finished&&"?"==c.P1[7].teamAway){var C=c.P2[5].scoreHome>c.P2[5].scoreAway?c.P2[5].teamHome:c.P2[5].teamAway;e.updateSchedule("P1",7,x(x({},c.P1[7]),{},{teamAway:C}))}if(c.P2[6].finished&&"?"==c.P2[7].teamAway){var _=c.P2[6].scoreHome>c.P2[6].scoreAway?c.P2[6].teamHome:c.P2[6].teamAway;e.updateSchedule("P2",7,x(x({},c.P2[7]),{},{teamAway:_}))}if(c.P1[7].finished){var Z=c.P1[7].scoreHome>c.P1[7].scoreAway?c.P1[7].teamHome:c.P1[7].teamAway,M=c.P1[7].scoreHome<c.P1[7].scoreAway?c.P1[7].teamHome:c.P1[7].teamAway;"?"==c.P1[9].teamHome&&e.updateSchedule("P1",9,x(x({},c.P1[9]),{},{teamHome:Z})),"?"==c.P1[8].teamHome&&e.updateSchedule("P1",8,x(x({},c.P1[8]),{},{teamHome:M}))}if(c.P2[7].finished){var T=c.P2[7].scoreHome>c.P2[7].scoreAway?c.P2[7].teamHome:c.P2[7].teamAway,N=c.P2[7].scoreHome<c.P2[7].scoreAway?c.P2[7].teamHome:c.P2[7].teamAway;"?"==c.P1[9].teamAway&&e.updateSchedule("P1",9,x(x({},c.P1[9]),{},{teamAway:T})),"?"==c.P1[8].teamAway&&e.updateSchedule("P1",8,x(x({},c.P1[8]),{},{teamAway:N}))}}}),[O]),{scheduleLoaded:r,schedule:c,groups:m,loadSchedule:C,lastMatchInd:y,teams:g,sortedTeams:O,players:j}},H=r(5944);function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function $(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var C=function(){var e=(0,a.Z)(s().mark((function e(t,r){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(b+"/islaunched/",!0).then(function(){var e=(0,a.Z)(s().mark((function e(n){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t(n.launched),r();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(){console.log("Unable to fetch isLaunched data."),t(!1)}));case 2:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),E=function(e){var t=e.Component,r=e.pageProps,n=w(),a=k(n);return(0,f.useEffect)((function(){C(n.setGameLaunched,a.loadSchedule)}),[]),(0,H.tZ)(i.Z.Provider,{value:n,children:(0,H.BX)(u.ZP.Provider,{value:a,children:[(0,H.tZ)(c.xB,{styles:n.style.globalStyle}),(0,H.tZ)(t,$({},r))]})})}},6363:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(3937)}])},6586:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,{Z:function(){return n}})},266:function(e,t,r){"use strict";function n(e,t,r,n,a,o,s){try{var c=e[o](s),i=c.value}catch(u){return void r(u)}c.done?t(i):Promise.resolve(i).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(a,o){var s=e.apply(t,r);function c(e){n(s,a,o,c,i,"next",e)}function i(e){n(s,a,o,c,i,"throw",e)}c(void 0)}))}}r.d(t,{Z:function(){return a}})},2809:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,{Z:function(){return n}})},318:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(6988);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o=[],s=!0,c=!1;try{for(r=r.call(e);!(s=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);s=!0);}catch(i){c=!0,a=i}finally{try{s||null==r.return||r.return()}finally{if(c)throw a}}return o}}(e,t)||(0,n.Z)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},6988:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(6586);function a(e,t){if(e){if("string"===typeof e)return(0,n.Z)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?(0,n.Z)(e,t):void 0}}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(6363),t(4651)}));var r=e.O();_N_E=r}]);