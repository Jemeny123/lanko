"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}var Menu=function(){function r(e,n,t,i){_classCallCheck(this,r),this.title=e,this.clsName=n,this.href=t,this.children=[],this.subClsName=i}return _createClass(r,[{key:"appendSubMenu",value:function(e){this.children.push(e)}},{key:"render",value:function(e){var n=document.createElement("li");if(n.className=this.clsName,e.appendChild(n),""==this.href){var t=document.createElement("span");t.innerHTML=this.title,n.appendChild(t)}else{var i=document.createElement("a");i.innerHTML=this.title,i.href=this.href,n.appendChild(i)}if(0<this.children.length){var r=document.createElement("ul");for(var s in r.className=this.subClsName,n.appendChild(r),this.children)this.children[s].render(r)}}}]),r}(),RootMenu=function(){function n(e){_classCallCheck(this,n),this.boxDom=e,this.children=[]}return _createClass(n,[{key:"appendSubMenu",value:function(e){this.children.push(e)}},{key:"render",value:function(){for(var e in this.children)this.children[e].render(this.boxDom)}}]),n}();