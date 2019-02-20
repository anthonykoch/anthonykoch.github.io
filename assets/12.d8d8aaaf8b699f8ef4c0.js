(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{335:function(e,t,n){},350:function(e,t,n){"use strict";var r=n(335);n.n(r).a},351:function(e,t,n){"use strict";n.r(t);n(162),n(163),n(96),n(74);var r=n(2),l=(n(34),n(164),n(13),n(160),n(124)),o=n.n(l),c=n(352),d=n.n(c),f=n(357),v=n.n(f),h=function(a,b){return+a==+b},m={id:d()(),path:"/layouts/master.blade",range:{start:0,end:0},header:'{\n\t"file": "/layouts/master.blade",\n\t"user": {\n\t\t"name": "Michael Weston"\n\t}\n}',contents:"\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n\t<meta charset=\"UTF-8\"/>\n\t<title>@yield('title')</title>\n</head>\n<body>\n\n\t@yield('content')\n\n</body>\n</html>\n"},F={id:d()(),path:"/pages/home.blade",range:{start:87,end:87},header:'{\n  "file": "/pages/home.blade",\n  "user": {\n    "name": "Michael Weston"\n  }\n}',contents:"\n@extends('layouts.master')\n\n@section('content')\n\n  @if(user)\n    Hello {{ user.name }}\n  @else\n    Sign in?\n  @endif\n\n@stop\n"},C={id:d()(),path:"/includes/user.blade",range:{start:87,end:87},header:'{\n  "file": "/includes/user.blade"\n}',contents:"Have a great day!"},w=[m,F,C],y=(w.findIndex(function(e){return e===F}),F);Array(2).fill(Number).forEach(function(){setTimeout(function(){console.time("hot"),v.a.render(y.contents,{user:""},{files:w,debug:!0}),console.timeEnd("hot")})});var P={files:w.slice(0),activeFile:Object(r.a)({},y),contents:y.contents,activePane:"code",jsonHeader:y.header,output:"",error:""},_={REMOVE_FILE:function(e,t){var n=t.id,l=e.files.findIndex(function(e){return h(e.id,n)});1===e.files.length?e.files=w.slice(0):e.files.splice(l,1),h(e.activeFile.id,n)&&(e.activeFile=Object(r.a)({},e.files[0]))},UPDATE_FILE_PATH:function(e,t){var n=t.id,r=t.value,l=E.getFileById(e,n);if(null!=l&&""!==r.trim()){var o=k(r);l.path=o;try{var header=JSON.parse(l.header);header.file=o;var c=JSON.stringify(header,null,"  ");l.header=c,e.jsonHeader=c}catch(e){}}},UPDATE_ACTIVE_FILE:function(e,t){var n=t.id,r=E.getFileById(e,n);e.activeFile=r,e.contents=r.contents},UPDATE_CONTENTS:function(e,t){var n=t.id,r=t.contents,l=E.getFileById(e,n);e.contents=r,l.contents=r},UPDATE_OUTPUT:function(e,t){var n=t.id,r=E.getFileById(e,n),l=e.files;console.log("Rendering:",r.id,r);var o=function(e,t){var n=t.files,data=null,r=null,l={},header=e.header;try{""!==e.header.trim()&&(l=JSON.parse(e.header))}catch(e){r=e,console.log(e)}try{null===r&&(console.time("render"),data=v.a.render(e.contents,l,{files:n,debug:!0}),console.timeEnd("render"))}catch(e){r=e,console.log(e)}return{header:header,data:data,locals:l,error:r}}(r,{files:l,debug:!0}),c=o.error,data=o.data;e.error=null==c?"":c.message,null==c&&(e.output=null==data?"":data)},UPDATE_ACTIVE_PANE:function(e,t){var n=t.value;console.log("Updating pane:",n),e.activePane=n},UPDATE_JSON_HEADER:function(e,t){var n=t.id,r=t.value;E.getFileById(e,n).header=r,e.jsonHeader=r},ADD_FILE:function(e,t){var n=t.value,r=e.files,l=k("/"+n);if(!r.some(function(e){return a=e.path,b=l,k(a.toLowerCase())===k(b.toLowerCase());var a,b})){var o={id:d()(),path:l,header:'{\n  "file": "'.concat(l.replace(/"/g,'\\"'),'"\n}'),contents:"<div>\n {{ file }}\n</div>"};e.activeFile=o,e.files.push(o)}}},E={getFileById:function(e,t){return e.files.find(function(e){return h(e.id,t)})||null}};function k(e){return o.a.normalize(e.toString().trim().replace(/\.blade$/,"").replace(/\\/g,"/")+".blade")}t.default={state:P,actions:{removeFile:function(e,t){(0,e.commit)("REMOVE_FILE",t)},updateFilePath:function(e,t){(0,e.commit)("UPDATE_FILE_PATH",t)},updateActiveFile:function(e,t){var n=e.commit;n("UPDATE_ACTIVE_FILE",t),n("UPDATE_OUTPUT",{id:t.id})},updateActivePane:function(e,t){(0,e.commit)("UPDATE_ACTIVE_PANE",t)},updateContents:function(e,t){var n=e.commit,r=e.state;n("UPDATE_CONTENTS",t);var l=r.activeFile.id;l===t.id&&n("UPDATE_OUTPUT",{id:l})},updateJsonHeader:function(e,t){var n=e.commit;n("UPDATE_JSON_HEADER",t),n("UPDATE_OUTPUT",{id:t.id})},updateOutput:function(e,t){var n=e.commit;e.state,n("UPDATE_OUTPUT",t)},addFile:function(e,t){(0,e.commit)("ADD_FILE",t)}},mutations:_}},361:function(e,t,n){"use strict";n.r(t);var r=n(2),l=n(1),o=n(33),c=n(360),d=n(336),f=n.n(d),v={props:["file"],data:function(){return{isEditingPath:!1,path:this.file.path}},computed:{filePath:function(){return this.file.path}},methods:{deleteFile:function(){this.$emit("file:delete",this.file)},enableEditingPath:function(){var e=this;this.isEditingPath=!0,this.$nextTick(function(){e.$refs.input.focus()})},updateActiveFile:function(){this.$emit("file:set-current",this.file.id),this.$emit("pane:update","code")},updateFilePath:function(){console.log(this.file.path,this.path),this.file.path!==this.path&&this.$emit("file:update-path",this.file.id,this.path),this.$refs.input.blur()}}},h=n(0),m=Object(h.a)(v,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"br-FilesList-item"},[n("div",{staticClass:"br-File"},[n("div",{staticClass:"br-File-name",attrs:{tabindex:"0"},on:{keyup:function(t){return"keyCode"in t&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:t.target!==t.currentTarget?null:e.updateActiveFile(e.file.id)},click:function(t){return t.target!==t.currentTarget?null:e.updateActiveFile(e.file.id)}}},[n("span",[e._v(e._s(e.filePath))]),e._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:e.isEditingPath,expression:"isEditingPath"}],ref:"input",staticClass:"br-File-inputEditText",attrs:{type:"text",value:"",autocomplete:"off",tabindex:"-1"},domProps:{value:e.filePath},on:{keyup:[function(t){e.path=t.target.value},function(t){return"keyCode"in t&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.updateFilePath(t)},function(t){if("keyCode"in t&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"]))return null;e.isEditingPath=!1}],focusout:function(t){e.isEditingPath=!1}}})]),e._v(" "),n("div",{staticClass:"br-FileActions"},[n("button",{staticClass:"br-FileActions-button",on:{click:function(t){return e.deleteFile(e.file)}}},[n("svg",{staticClass:"br-FileActions-icon is-delete",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[n("path",{attrs:{d:"M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"}})])]),e._v(" "),n("button",{staticClass:"br-FileActions-button",on:{click:e.enableEditingPath}},[n("svg",{staticClass:"br-FileActions-icon is-edit",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[n("path",{attrs:{d:"M64 368v80h80l235.727-235.729-79.999-79.998L64 368zm377.602-217.602c8.531-8.531 8.531-21.334 0-29.865l-50.135-50.135c-8.531-8.531-21.334-8.531-29.865 0l-39.468 39.469 79.999 79.998 39.469-39.467z"}})])])])])])},[],!1,null,null,null).exports,F={data:function(){return{paneMessages:["Hi, these are files you can include into your template","or you can extend them using @extend","who am I to tell you what to do?"],paneMessageIndex:0,newFileName:"",isInputNewFileFocused:!1}},created:function(){},computed:Object(r.a)({},Object(o.c)(["files","activeFile","activePane","jsonHeader","contents","output","error"]),{paneMessage:function(){return this.paneMessages[this.paneMessageIndex]}}),components:{BrFileListItem:m},watch:{activeFile:function(e){this.updateJsonHeader(e.id,e.header),this.updateContents(e.contents),this.updateOutput(e.id)}},methods:Object(r.a)({},Object(o.b)(["removeFile","updateActivePane","updateActiveFile"]),{updateFilePath:function(e,t){this.$store.dispatch("updateFilePath",{id:e,value:t})},updateOutput:function(e){this.$store.dispatch("updateOutput",{id:e})},updateContents:function(e){this.$store.dispatch("updateContents",{id:this.activeFile.id,contents:e})},updateJsonHeader:function(e,t){this.$store.dispatch("updateJsonHeader",{id:e,value:t})},onInputleftKeydown:function(e){e.target.value.length>5e3&&e.preventDefault()},onJsonHeaderKeyup:function(e){this.updateJsonHeader(this.activeFile.id,e.target.value)},onInputLeftKeyup:f()(function(){this.updateContents(this.$refs.inputLeft.value)},150),addFile:function(){var e=this,t=this.newFileName;""!==t.trim()&&(this.newFileName="",this.isInputNewFileFocused=!1,this.$nextTick(function(){return e.$refs.inputNewFile.blur()}),this.$store.dispatch("addFile",{value:t}))}})},C=(n(350),Object(h.a)(F,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"br-App  js-br-app",attrs:{tabIndex:"-1"}},[n("a",{attrs:{href:"/#blade",id:"blade",name:"blade",tabindex:"-1"}}),e._v(" "),n("div",{staticClass:"br-Sidebar"},[n("ul",{staticClass:"br-SidebarList"},[n("li",{staticClass:"br-SidebarList-item br-SidebarList-item--newFile  js-br-button-new-file"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newFileName,expression:"newFileName"}],ref:"inputNewFile",staticClass:"br-InputNewFile  js-br-input-new-file",class:{"br-InputNewFile--is-showing":e.isInputNewFileFocused},attrs:{type:"text",placeholder:"Enter filename"},domProps:{value:e.newFileName},on:{focusin:function(t){e.isInputNewFileFocused=!0},focusout:function(t){e.isInputNewFileFocused=!1},keyup:[function(t){if("keyCode"in t&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"]))return null;e.isInputNewFileFocused=!1},function(t){return"keyCode"in t&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addFile(t)}],input:function(t){t.target.composing||(e.newFileName=t.target.value)}}}),e._v(" "),n("button",{ref:"buttonNewFile",staticClass:"br-SidebarButton",class:{"br-SidebarButton--is-focused":e.isInputNewFileFocused},attrs:{tabindex:"-1"},on:{click:function(t){return e.$refs.inputNewFile.focus()}}},[n("span",{staticClass:"br-SidebarButton-container"},[n("span",{staticClass:"br-SidebarButton-iconWrapper"},[n("svg",{staticClass:"br-SidebarButton-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[n("path",{attrs:{d:"M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"}})])]),e._v(" "),n("span",{staticClass:"br-SidebarButton-text"},[e._v("New File")])])])]),e._v(" "),n("li",{staticClass:"br-SidebarList-item  js-br-view-code"},[n("button",{ref:"buttonCode",staticClass:"br-SidebarButton",class:{"br-SidebarButton--is-active":"code"===e.activePane},attrs:{tabindex:"0"},on:{keyup:function(t){return"keyCode"in t&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.updateActivePane({value:"code"})},click:function(t){return e.updateActivePane({value:"code"})}}},[n("span",{staticClass:"br-SidebarButton-container"},[n("span",{staticClass:"br-SidebarButton-iconWrapper"},[n("svg",{staticClass:"br-SidebarButton-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[n("path",{attrs:{d:"M190.4 354.1L91.9 256l98.4-98.1-30-29.9L32 256l128.4 128 30-29.9zm131.2 0L420 256l-98.4-98.1 30-29.9L480 256 351.6 384l-30-29.9z"}})])]),e._v(" "),n("span",{staticClass:"br-SidebarButton-text"},[e._v("Code")])])])]),e._v(" "),n("li",{staticClass:"br-SidebarList-item br-SidebarList-item--seeFiles  js-br-view-files"},[n("button",{ref:"buttonViewFiles",staticClass:"br-SidebarButton",class:{"br-SidebarButton--is-active":"files"===e.activePane},attrs:{tabindex:"0"},on:{keyup:function(t){return"keyCode"in t&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.updateActivePane({value:"files"})},click:function(t){return e.updateActivePane({value:"files"})}}},[n("span",{staticClass:"br-SidebarButton-container"},[n("span",{staticClass:"br-SidebarButton-iconWrapper"},[n("svg",{staticClass:"br-SidebarButton-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[n("path",{attrs:{d:"M437.334 144H256.006l-42.668-48H74.666C51.197 96 32 115.198 32 138.667v234.666C32 396.802 51.197 416 74.666 416h362.668C460.803 416 480 396.802 480 373.333V186.667C480 163.198 460.803 144 437.334 144zM448 373.333c0 5.782-4.885 10.667-10.666 10.667H74.666C68.884 384 64 379.115 64 373.333V176h373.334c5.781 0 10.666 4.885 10.666 10.667v186.666z"}})])]),e._v(" "),n("span",{staticClass:"br-SidebarButton-text"},[e._v("View Files")])])])])])]),e._v(" "),n("div",{staticClass:"br-MainPane",attrs:{"active-pane":e.activePane}},[n("div",{staticClass:"br-MainPane-left"},[n("div",{directives:[{name:"show",rawName:"v-show",value:"files"===e.activePane,expression:"activePane === 'files'"}],staticClass:"br-FilesPane br-FilesPane",staticStyle:{display:"none"}},[n("transition-group",{staticClass:"br-FilesList",attrs:{tag:"ul",name:"tr-listRemove"}},e._l(e.files,function(t,r){return n("br-file-list-item",{key:t.id,tag:"li",attrs:{file:t},on:{"file:delete":function(n){return e.removeFile({id:t.id})},"file:update-path":e.updateFilePath,"file:set-current":function(n){return e.updateActiveFile({id:t.id})},"pane:update":function(t){return e.updateActivePane({value:"code"})}}})}),1),e._v(" "),n("div",{staticClass:"br-FilesPane-background"},[n("div",{staticClass:"br-FilesPane-backgroundWrapper"},[n("div",{staticClass:"u-text-center"},[n("div",{staticClass:"br-FilesPane-backgroundComment"},[n("span",{staticClass:"u-inlineBlock"},[e._v("\n                  "+e._s(e.paneMessage)+"\n                ")])])]),e._v(" "),n("div",{staticClass:"br-FilesPane-backgroundText"},[e._v("@_@")])])])],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:"code"===e.activePane,expression:"activePane === 'code'"}],staticClass:"br-InputContainer"},[n("textarea",{staticClass:"br-Inputs-jsonInput",attrs:{type:"text"},domProps:{value:e.jsonHeader},on:{keyup:e.onJsonHeaderKeyup}}),e._v(" "),n("textarea",{ref:"inputLeft",staticClass:"br-InputField br-InputField--left",domProps:{value:e.contents},on:{keyup:e.onInputLeftKeyup,keydown:[function(t){if("keyCode"in t&&e._k(t.keyCode,"tab",9,t.key,"Tab"))return null;t.preventDefault()},e.onInputleftKeydown]}})])]),e._v(" "),n("div",{staticClass:"br-MainPane-right"},[n("div",{staticClass:"br-OutputContainer"},[n("textarea",{staticClass:"br-InputField br-InputField--right",attrs:{readonly:""},domProps:{value:e.output}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.error,expression:"error"}],staticClass:"br-ErrorMessage",staticStyle:{display:"none"}},[e._v(e._s(e.error))])])])])])},[],!1,null,null,null).exports);function w(e){var t=new o.a.Store(Object(r.a)({},n(351).default,{key:"bladejs",plugins:[Object(c.a)()]}));return t.subscribe(function(e,t){e.payload,e.type;console.log("Mutation:",e,t)}),new l.a({el:e,store:t,render:function(e){return e(C)}})}n.d(t,"default",function(){return w})}}]);