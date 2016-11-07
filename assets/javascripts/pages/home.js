webpackJsonp([1],[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e){var t={};for(var n in e){var i=$(e[n]).innerHTML,r=document.createElement("div");r.innerHTML=i,t[n]=r.children[0]}return t}function s(e,t){console.log(),console.time("render");var n=e.page,i=e.editId,r=e.files,s=e.currentFileId;if(!r.length)return y.default.update({files:z});if(t.files||t.currentFileId||t.editId){console.time("updatelist");var o=r.map(function(e){var t=e.id,n=e.path;return R.create({id:t,name:n,isEditing:i===t})});a(A,o,function(e,t){var n=$(B.textFileName,e),r=$(B.textFileName,t);if(null===t&&R.removeEventListeners(e),+i!==+e.dataset.id)n.setAttribute("contentEditable",!1);else{n.setAttribute("contentEditable",!0);n.textContent.length;setTimeout(function(){n.focus();var e=document.createRange(),t=window.getSelection();e.selectNode(n.firstChild),t.removeAllRanges(),t.addRange(e)},0)}n.textContent!==r.textContent&&(n.textContent=r.textContent)});console.timeEnd("updatelist")}var l=y.default.getFileById(s);if(t.currentFileId||t.files){console.time("blade");var u={files:r},c=m(l.contents,u),d=c.error,f=c.contents;d?(D.textContent=d.message,D.classList.add(M.isErrorShowing)):(x.value=f,D.classList.remove(M.isErrorShowing)),console.timeEnd("blade")}n.startsWith("/files")?S.classList.add(M.isFilesPaneShowing):n.startsWith("/edit")&&(S.classList.remove(M.isFilesPaneShowing),k.focus()),k.value!==l.contents&&(k.value=l.contents),console.timeEnd("render")}function a(e,t,n){for(var i=Array.from(e.children),r=[],s=i.length-1;s>=0;s--){for(var a=i[s],o=null,l=0;l<t.length;l++)t[l].dataset.id===a.dataset.id&&(o=t[l]);var u=n(a,o);null===o||null===u?e.removeChild(a):u&&u.nodeType===document.ELEMENT_NODE?(r.push(u.dataset.id),e.replaceChild(u,a)):r.push(a.dataset.id)}for(var c=0;c<t.length;c++)r.includes(t[c].dataset.id)||e.appendChild(t[c])}function o(e){var t=this.getAttribute("contentEditable");"true"===t&&e.keyCode===C&&(y.default.updateFileName(this.dataset.id,this.textContent),y.default.removeEditable())}function l(){y.default.removeEditable()}function u(){y.default.removeFile(this.dataset.id)}function c(){y.default.setEditable(this.dataset.id)}function d(e){e.keyCode===C&&""!==this.value.trim()&&(y.default.addNewFile("/"+this.value),this.value="")}function f(){var e=this.getAttribute("contentEditable");"false"===e&&y.default.setCurrentFile(this.dataset.id)}function h(){y.default.setPage("/files")}function v(){y.default.setPage("/edit")}function g(e){e.keyCode===w&&e.preventDefault()}function p(){y.default.setCurrentFileContents(this.value)}function m(e,t){var n=t.files,i=/^(?:((?:[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?)\-\-\-(?:\r\n|[\n\r]))/,r=e.match(i),s=null,a=null,o={},l=n.map(function(e){var t=e.contents,n=t.match(i),r=t.substring(n[0].length,t.length);return Object.assign({},e,{contents:r})});if(r){e=e.substring(r[0].length,e.length);try{o=JSON.parse(r[1])}catch(e){a=a,console.log(e)}}try{s=j.render(e,o,{files:l,debug:!0})}catch(e){a=e,console.log(a)}return{contents:s,error:a}}var b=n(9),F=i(b),E=n(10),y=i(E),j=void 0,w=9,C=13,L="blade:page",I="blade:files",O="blade:files:current",_=$(".js-br-app"),k=$(".js-br-input-left"),x=$(".js-br-input-right"),D=$(".js-br-error-message"),N=$(".js-br-input-new-file"),S=$(".js-br-files-pane"),A=$(".js-br-files-list"),T=$(".js-br-view-files"),P=$(".js-br-view-code"),M={filesListItem:"br-FilesList-item",isErrorShowing:"br-ErrorMessage--is-showing",isFilesPaneShowing:"br-FilesPane--is-showing"},B={textFileName:".js-br-file-name-text",buttonDelete:".js-br-file-icon-delete",buttonEditName:".js-br-file-icon-edit"},W={id:y.default.uniqueId(),path:"/layouts/master.blade",contents:'{\n\t"file": "/layouts/master.blade",\n\t"user": {\n\t\t"name": "Michael Weston"\n\t}\n}\n---\n<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8"/>\n\t<title>@yield(\'title\')</title>\n</head>\n<body>\n\n\t@yield(\'content\')\n\n</body>\n</html>\n'},q={id:y.default.uniqueId(),path:"/home.blade",contents:'{\n\t"file": "/pages/home.blade",\n\t"user": {\n\t\t"name": "Michael Weston"\n\t}\n}\n---\n\n@extends(\'layouts.master\')\n\n@section(\'content\')\n\n  @if(user)\n    Hello {{ user.name }}\n  @else\n\t  Sign in?\n  @endif\n\n@stop\n'},z=[W,q],H=r({fileListItem:'[data-template="br-file-list-item"]'}),R=(n(13),{create:function(e){var t=e.name,n=e.id,i=e.isEditing,r=H.fileListItem.cloneNode(!0),s=$(B.textFileName,r),a=$(B.buttonDelete,r),d=$(B.buttonEditName,r);return s.textContent=t,s.dataset.id=n,r.dataset.id=n,a.dataset.id=n,d.dataset.id=n,s.setAttribute("contentEditable",!!i),s.addEventListener("focusout",l),s.addEventListener("keyup",o),s.addEventListener("click",f),a.addEventListener("click",u),d.addEventListener("click",c),r},removeEventListeners:function(e){var t=$(B.textFileName,e),n=$(B.buttonDelete,e),i=$(B.buttonEditName,e);t.removeEventListener("focusout",l),t.removeEventListener("keyup",o),t.removeEventListener("click",f),n.removeEventListener("click",u),i.removeEventListener("click",c)}});new Waypoint({element:_,offset:"120%",handler:function(){var e=$.create("link",{rel:"stylesheet",href:"http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"});document.head.appendChild(e),n.e(2,function(e){k.addEventListener("keyup",p),k.addEventListener("keydown",g),N.addEventListener("keyup",d),T.addEventListener("click",h),P.addEventListener("click",v),console.log("Boot"),j=n(15),y.default.on("change",s),y.default.mapToLocalStore({files:I,page:L,currentFileId:O}),y.default.update({page:F.default.get(L,"/edit"),files:F.default.get(I,z),currentFileId:F.default.get(O,q.id)})}),this.destroy()}})},,,,,,,,,,function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e){return o.default.normalize(e.toString().replace(/\.blade$/,"").replace(/\\/g,"/")+".blade")}var s,a=n(11),o=i(a),l=n(5),u=n(9),c=i(u);!function(){var e=1;s=function(){return e++}}();var d={},f={},h={},v={},g={removeFile:function(e){var t=d.files.filter(function(t){return+t.id!==+e}),n=d.currentFileId;+d.currentFileId===+e&&t.length&&(n=+t[0].id),this.__update({currentFileId:n,files:t})},removeEditable:function(){this.__update({editId:NaN})},updateFileName:function(e,t){var n=this.getFileById(e);if(null!=n&&""!==t.trim()){var i=r(t),s=d.files.map(function(t){return+t.id===+e?Object.assign({},t,{path:i}):t});this.__update({files:s})}},setEditable:function(e){this.__update({editId:+e})},setCurrentFile:function(e){var t=this.getFileById(e);null!=t&&this.__update({page:"/edit",currentFileId:+e})},setCurrentFileContents:function(e){var t=d.files.map(function(t){return t.id===d.currentFileId?Object.assign({},t,{contents:e}):t});this.__update({files:t})},addNewFile:function(e,t){var n=d,i=n.files,a=r(e),o=i.some(function(e){var t=r(e.path.toLowerCase()),n=a.toLowerCase();return t===n});if(!o){var l={id:s(),path:a,contents:'{\n    "name": "'+a.replace(/"/g,'\\"')+'"\n}\n---\n\n'};this.update({page:"/edit",currentFileId:l.id,files:i.concat(l)})}},setPage:function(e){this.__update({page:e})},getFileById:function(e){return d.files.reduce(function(t,n){return+n.id===+e?n:t},null)},update:function(e){this.__update(e)},getChanges:function(){return Object.assign({},f)},getState:function(){return Object.assign({},d)},getOldState:function(){return Object.assign({},h)},mapToLocalStore:function(e){v=Object.assign({},e)},emitChange:function(){this.emit("change",this.getState(),this.getChanges(),123,546)},uniqueId:s,__update:function(e){f=Object.keys(e).reduce(function(e,t){return e[t]=!0,e},{}),h=d,d=Object.assign({},d,e);for(var t in v)c.default.set(v[t],d[t]);this.emitChange()}};Object.assign(g,l.EventEmitter.prototype),e.exports=g},function(e,t,n){(function(e){function n(e,t){for(var n=0,i=e.length-1;i>=0;i--){var r=e[i];"."===r?e.splice(i,1):".."===r?(e.splice(i,1),n++):n&&(e.splice(i,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function i(e,t){if(e.filter)return e.filter(t);for(var n=[],i=0;i<e.length;i++)t(e[i],i,e)&&n.push(e[i]);return n}var r=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,s=function(e){return r.exec(e).slice(1)};t.resolve=function(){for(var t="",r=!1,s=arguments.length-1;s>=-1&&!r;s--){var a=s>=0?arguments[s]:e.cwd();if("string"!=typeof a)throw new TypeError("Arguments to path.resolve must be strings");a&&(t=a+"/"+t,r="/"===a.charAt(0))}return t=n(i(t.split("/"),function(e){return!!e}),!r).join("/"),(r?"/":"")+t||"."},t.normalize=function(e){var r=t.isAbsolute(e),s="/"===a(e,-1);return e=n(i(e.split("/"),function(e){return!!e}),!r).join("/"),e||r||(e="."),e&&s&&(e+="/"),(r?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(i(e,function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},t.relative=function(e,n){function i(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=t.resolve(e).substr(1),n=t.resolve(n).substr(1);for(var r=i(e.split("/")),s=i(n.split("/")),a=Math.min(r.length,s.length),o=a,l=0;l<a;l++)if(r[l]!==s[l]){o=l;break}for(var u=[],l=o;l<r.length;l++)u.push("..");return u=u.concat(s.slice(o)),u.join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){var t=s(e),n=t[0],i=t[1];return n||i?(i&&(i=i.substr(0,i.length-1)),n+i):"."},t.basename=function(e,t){var n=s(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},t.extname=function(e){return s(e)[3]};var a="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(t,n(12))},,function(e,t,n){"use strict";function i(e){if(null===e||void 0===e)throw new TypeError("Sources cannot be null or undefined");return Object(e)}function r(e,t,n){var i=t[n];if(void 0!==i&&null!==i){if(o.call(e,n)&&(void 0===e[n]||null===e[n]))throw new TypeError("Cannot convert undefined or null to object ("+n+")");o.call(e,n)&&a(i)?e[n]=s(Object(e[n]),t[n]):e[n]=i}}function s(e,t){if(e===t)return e;t=Object(t);for(var n in t)o.call(t,n)&&r(e,t,n);if(Object.getOwnPropertySymbols)for(var i=Object.getOwnPropertySymbols(t),s=0;s<i.length;s++)l.call(t,i[s])&&r(e,t,i[s]);return e}var a=n(14),o=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;e.exports=function(e){e=i(e);for(var t=1;t<arguments.length;t++)s(e,arguments[t]);return e}},function(e,t){"use strict";e.exports=function(e){var t=typeof e;return null!==e&&("object"===t||"function"===t)}}]);