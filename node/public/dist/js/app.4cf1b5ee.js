(function(e){function t(t){for(var r,a,u=t[0],c=t[1],s=t[2],f=0,d=[];f<u.length;f++)a=u[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(d.length)d.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,u=1;u<n.length;u++){var c=n[u];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},i=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var s=0;s<u.length;s++)t(u[s]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"199c":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_exports__["a"]={name:"app",mounted:function(){echarts.init(document.getElementById("asdasdmain"))},methods:{handleReferenceError:function(){console.log(aaaa)},handleTypeError:function(){var e=1;e()},handleSyntaxError:function handleSyntaxError(){eval("heeo asd")}}}},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("input",{attrs:{type:"text"}}),r("button",{on:{click:e.handleReferenceError}},[e._v("ReferenceError报错")]),r("button",{on:{click:e.handleTypeError}},[e._v("TypeError报错")]),r("button",{on:{click:e.handleSyntaxError}},[e._v("SyntaxError报错")])])},i=[],a=n("199c"),u=a["a"],c=(n("034f"),n("2877")),s=Object(c["a"])(u,o,i,!1,null,null,null),l=s.exports,f=(n("64db"),n("d624"),n("4810"),n("7fdf"),n("b6fb"),n("4e2b"),n("308d"),n("6bb5"),n("7ff3"),n("d1bc"),n("768b")),d=(n("a230"),n("587d"),n("d6ad"),n("bd86")),p=(n("4e74"),n("3b8d")),h=n("75fc"),b=n("d225"),w=n("b0b4");function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){Object(d["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(){return!!(window.ActiveXObject||"ActiveXObject"in window||navigator.userAgent.indexOf("Edge")>-1)}function y(e){return new Promise((function(t,n){var r=document.createElement("script");r.async=!0,r.src=e,r.onload=t,r.onerror=function(t){return n(new Error("Unable to load "+e+": "+t))},document.body.appendChild(r)}))}function O(e){return new Promise((function(t,n){var r=document.createElement("link");r.href=e,r.rel="stylesheet",r.onload=t,r.onerror=function(t){return n(new Error("Unable to load "+e+": "+t))},document.body.appendChild(r)}))}var j=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;Object(b["a"])(this,e),this.front=0,this.tail=0,this.size=0,this.Queue=new Array(t)}return Object(w["a"])(e,[{key:"getSize",value:function(){return this.size}},{key:"enqueue",value:function(e){var t=this.Queue.length,n=this.tail%t;this.tail===this.front&&0!==this.getSize()&&(this.front=(this.front+1)%t),this.tail=(this.tail+1)%t,this.Queue[n]=e,this.size++}},{key:"dequeue",value:function(){var e=this.Queue.length;if(0===this.getSize()&&this.front%e===this.tail)throw new Error("Can't get empty queue");var t=this.Queue[this.front];return this.Queue[this.front]=null,this.front=(this.front+1)%e,this.size--,t}},{key:"getQueue",value:function(){var e=[],t=this.Queue.length;if(this.getSize()<t)e=this.Queue.slice(0,this.tail);else if(0===this.font)e=this.Queue;else{var n=this.Queue.slice(this.front),r=this.Queue.slice(0,this.front);e=[].concat(Object(h["a"])(n),Object(h["a"])(r))}return e}}]),e}(),_=50,k=_,E=new j(k);function x(){window.rrweb.record({emit:function(e){E.getSize()>=k&&E.dequeue(),E.enqueue(e)}})}function P(){return R.apply(this,arguments)}function R(){return R=Object(p["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",E.getQueue());case 1:case"end":return e.stop()}}),e)}))),R.apply(this,arguments)}var S="http://localhost:3090",Q={isFramework:!0,isNeedRecord:!0};O("https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css"),y("https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js").then((function(){x()}));var T={error:S+"/errorRequest",performance:S+"/performance"},q=null,z=function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){var n,r,o,i=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=i.length>1&&void 0!==i[1]?i[1]:Q.isFramework,clearTimeout(q),r="unhandledrejection"===t.type?{type:t.type,msg:t.reason}:A(t),e.next=5,P();case 5:o=e.sent,r=m(m({},r),{},{error:t.stack,eventsRecord:o,url:window.location.href,framework:n}),q=setTimeout(Object(p["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:C(T["error"],r);case 1:case"end":return e.stop()}}),e)}))));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function C(e,t){var n=JSON.stringify(t);if(window.navigator.sendBeacon)window.navigator.sendBeacon(e+"FromBeacon",n);else if(g()&&encodeURIComponent(n).length<2083||!g()&&encodeURIComponent(n).length<8182){var r=new Image;r.src=e+"?"+encodeURIComponent(n)}else if(window.fetch)fetch(e,{body:n,method:"POST",headers:{"content-type":"application/json; charset=utf-8"}});else{var o=null;window.XMLHttpRequest?o=new window.XMLHttpRequest:window.ActiveXObject&&(o=new window.ActiveXObject),o.open("POST",e,!0),o.setRequestHeader("Content-Type","application/json; charset=utf-8"),o.send(n)}}function A(e){var t=e.message,n=e.stack&&e.stack.split("\n")||[],r=window.location.origin,o=n.find((function(e){return new RegExp(r).test(e)}));if(o){var i=o.lastIndexOf("/"),a=o.substr(i+1).split(":"),u=Object(f["a"])(a,3),c=u[0],s=u[1],l=u[2],d=Number(s.match(/\d+/)[0]),p=Number(l.match(/\d+/)[0]);return{path:c,lineNo:d,columnNo:p,msg:t,error:e}}return!1}function I(e){e.config.errorHandler=function(e){z(e,!0)}}window.addEventListener("error",(function(e){z(e.error,!1)}),!0),window.addEventListener("unhandledrejection",(function(e){e.preventDefault();var t=e.type,n=e.reason;z({type:t,msg:n},!1)}));var M={install:I},N=M;r["a"].use(N),r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(l)}}).$mount("#app")},"64a9":function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.4cf1b5ee.js.map