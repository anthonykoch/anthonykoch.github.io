(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{276:function(e,t,s){},284:function(e,t,s){"use strict";var a=s(276);s.n(a).a},303:function(e,t,s){"use strict";s.r(t);var a=s(6),i=s.n(a),o=s(20),n={props:{},components:{page:s(47).default},data:function(){return{console:console,activeMFImageIndex:0,activeHeroIndex:0,isHeroShowing:!0,heroItems:[{title:"website?",caption:"I develop websites that work across a wide range of devices."},{title:"design developed?",caption:"Have a design that needs implementation? I can bring the design to life."},{title:"hand on a project?",caption:"I'm experienced with React, Vue, and vanilla JS, but am always excited to take on new challenges."}],navigatedProject:null,overlays:{projects:{isShowing:!1,background:"is-white"}}}},head:function(){return{title:"Anthony Koch",description:"Hello, my name is Anthony Koch. I'm a front-end developer specializing in responsive design, web performance, and custom web development."}},computed:i()({},Object(o.c)({projects:function(e){return e.projects.codepen},featuredProject:function(e){return e.projects.github.editorconnect}}),{activeHero:function(){return this.heroItems[this.activeHeroIndex]},images:function(){return{}}}),methods:{loopImages:function(){var e=this;setTimeout(function(){e.activeMFImageIndex+=1,e.activeMFImageIndex>1&&(e.activeMFImageIndex=1),e.loopImages()},3e3)},showNextHero:function(){this.activeHeroIndex=this.activeHeroIndex+1>=this.heroItems.length?0:this.activeHeroIndex+1},onHeroHidden:function(){var e=this;this.showNextHero(),setTimeout(function(){e.isHeroShowing=!0},100)},onHeroShowing:function(){this.hideHero()},hideHero:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3500;setTimeout(function(){e.isHeroShowing=!1},t)},navigateToProject:function(e){var t=this;this.overlays.projects.isShowing=!0,setTimeout(function(){window.location=t.navigatedProject.href},100)},setNavigatedProject:function(e,t){this.navigatedProject=t,this.overlays.projects.isShowing=!0,this.overlays.projects.background=t.fade}},mounted:function(){this.hideHero(2e3)}},r=(s(284),s(1)),c=Object(r.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("page",{attrs:{showSocial:!1}},[a("transition",{attrs:{name:"tr-fade"},on:{"after-enter":e.navigateToProject,"enter-cancelled":e.navigateToProject}},[a("app-overlay",{directives:[{name:"show",rawName:"v-show",value:e.overlays.projects.isShowing,expression:"overlays.projects.isShowing"}],ref:"projectsOverlay",attrs:{background:e.overlays.projects.background}})],1),e._v(" "),a("div",{attrs:{slot:"heroLower"},slot:"heroLower"},[a("div",{staticClass:"LandingHero"},[a("div",[a("p",{staticClass:"LandingHero-availability"},[a("nuxt-link",{staticClass:"Link is-white",attrs:{to:"contact"}},[e._v("Available for projects")])],1),e._v(" "),a("div",{staticClass:"LandingHero-title"},[a("span",[e._v("Need a ")]),e._v(" "),a("transition",{attrs:{name:"tr-vertical-text-rotate"},on:{afterEnter:e.onHeroShowing,afterLeave:e.onHeroHidden}},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.isHeroShowing,expression:"isHeroShowing"}],staticClass:"LandingHero-titlePart",staticStyle:{"transition-delay":"100ms"}},[e._v("\n              "+e._s(e.activeHero.title)+"\n            ")])])],1)]),e._v(" "),a("div",[a("transition",{attrs:{name:"tr-vertical-text-rotate"}},[a("p",{directives:[{name:"show",rawName:"v-show",value:e.isHeroShowing,expression:"isHeroShowing"}],staticClass:"LandingHero-caption"},[e._v("\n            "+e._s(e.activeHero.caption)+"\n          ")])])],1)])]),e._v(" "),a("section",{attrs:{id:"work"}},[a("div",{staticClass:"u-siteWrapper u-pt4 u-pt7@lg u-gutter"},[a("div",{staticClass:"FeatureWork"},[a("h2",{staticClass:"Heading is-type1  u-pl5@lg u-textCenter u-textLeft@lg"},[a("span",[e._v("Featured Work")])]),e._v(" "),a("div",{staticClass:"FeaturedWork-grid"},[a("div",{staticClass:"FeaturedWork-column is-left"},[a("div",{staticClass:"FeaturedWork-media u-pl2 u-pl0@lg"},[a("div",{staticClass:"WorkImages"},[a("div",{staticClass:"WorkImages-container"},[a("div",{staticClass:"WorkImages-aspectFill"},[a("transition",{attrs:{name:"tr-fade"}},[a("a",{directives:[{name:"show",rawName:"v-show",value:0===e.activeMFImageIndex,expression:"activeMFImageIndex === 0"}],staticClass:"WorkImages-link",attrs:{href:"https://modernfertility.com/",rel:"noreferrer noopener",target:"_blank"}},[a("img",{staticClass:"WorkImages-image",attrs:{src:s(128),alt:"modern fertility landing page"}})])])],1),e._v(" "),a("div",{staticClass:"[ Tag is-absolute ]  WorkImages-tag"},[e._v("Web Development")])])])])]),e._v(" "),a("div",{staticClass:"FeaturedWork-column is-right is-pushedRight has-paddingLeft"},[a("div",[a("div",{staticClass:"FeatureWork-title"},[e._v("\n                Modern Fertility\n              ")]),e._v(" "),a("p",{staticClass:"FeatureWork-text"},[e._v("\n                Modern Fertility approached me to assist them in developing their website. At the time, I was the sole front-end developer, working alongside Tom Chokel to help Carly and Afton to help get their new business concept out to the world.\n              ")]),e._v(" "),a("p"),e._v(" "),a("ul",{staticClass:"FeaturedWork-list"},[a("li",[e._v("Developed design into responsive website")]),e._v(" "),a("li",[e._v("Developed checkout system")]),e._v(" "),a("li",[e._v("Landing page development ")]),e._v(" "),a("li",[e._v("Dashboard development")])]),e._v(" "),a("div",{staticClass:"u-textCenter u-textLeft@lg"},[a("a",{staticClass:"FeaturedWork-cta",attrs:{href:"https://modernfertility.com/",target:"_blank",rel:"noreferrer noopener"}},[e._v("\n                  View Website\n                ")])])])])]),e._v(" "),a("div",{staticClass:"FeaturedWork-grid u-mb8 u-itemsCenter"},[a("div",{staticClass:"FeaturedWork-column is-left  u-order1@lg"},[a("div",{staticClass:"FeaturedWork-media u-pl2 u-pl0@lg"},[a("div",{staticClass:"WorkImages"},[a("div",{staticClass:"WorkImages-container has-dark-shadow"},[a("div",{staticClass:"WorkImages-aspectFill"},[a("img",{staticClass:"WorkImages-image",attrs:{src:s(129),alt:""}}),e._v(" "),a("div",{staticClass:"[ Tag is-absolute ]  WorkImages-tag "},[e._v("Web Development")])])])])])]),e._v(" "),a("div",{staticClass:"FeaturedWork-column is-right is-pushedLeft has-paddingRight"},[a("div",{staticClass:"FeatureWork-title"},[e._v("\n              Plaid Technologies\n            ")]),e._v(" "),a("p",{staticClass:"FeatureWork-text"},[e._v("\n              I was brought on by Plaid Technologies as a remote front-end developer. Responsibilities included turning designs into pixel perfect code, developing various features around the site, and improving performance for the site.\n            ")])])])])])]),e._v(" "),a("section",{staticClass:"u-pb8",attrs:{id:"contact"}},[a("div",{staticClass:"u-textCenter"},[a("h2",{staticClass:"[ Heading is-type3 ]  u-gutter"},[e._v("\n        Have a project in mind?\n      ")]),e._v(" "),a("nuxt-link",{staticClass:"Button has-lightBackground has-hoverEffect1 is-sizeLarge",attrs:{to:"contact"}},[e._v("\n        Get in touch\n      ")])],1)]),e._v(" "),a("section",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"u-mxauto",staticStyle:{"max-width":"1140px"},attrs:{id:"codepen"}},[a("div",{staticClass:"u-siteWrapper u-px0  u-textCenter u-textLeft@lg"},[a("h2",{staticClass:"[ Heading is-type1 ] u-px5@lg"},[a("span",[e._v("Personal Projects")])])]),e._v(" "),a("div",{staticClass:"CodepenProjects",staticStyle:{"background-color":"transparent"}},[a("div",{staticClass:"u-siteWrapper u-px5"},[a("app-project-preview-list",{ref:"projects",attrs:{projects:e.projects},on:{navigate:e.setNavigatedProject}}),e._v(" "),a("div",{staticClass:"u-textCenter"},[a("a",{staticClass:"Button has-lightBackground has-hoverEffect1 is-sizeLarge",attrs:{href:"https://codepen.io/anthonykoch/"}},[e._v("\n            View more on Codepen →\n          ")])])],1)])])],1)},[],!1,null,null,null);c.options.__file="index.vue";t.default=c.exports}}]);