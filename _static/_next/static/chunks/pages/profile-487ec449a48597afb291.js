_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[17],{G9T2:function(t,e,n){"use strict";var a=n("nKUr"),i=n("g4pe"),c=n.n(i),r=(n("rKWB"),n("YFqc")),s=n.n(r),l=n("q1tI"),o=function(t){return Object(a.jsx)(s.a,{href:t.path,as:t.path,prefetch:!1,children:Object(a.jsx)("div",{children:Object(a.jsx)("span",{children:t.label})})})},u=function(t){return Object(a.jsx)("div",{children:t.navButtons.map((function(t){return Object(a.jsx)(o,{path:t.path,label:t.label},t.path)}))})},d=[{label:"Links",path:"/"},{label:"Statistic",path:"/statistic"},{label:"Profile",path:"/profile"},{label:"Contact",path:"/contact"},{label:"Sign Out",path:"/signout"}],h=[{label:"Links",path:"/"},{label:"Statistic",path:"/statistic"},{label:"Profile",path:"/profile"},{label:"Contact",path:"/contact"},{label:"Login",path:"/login"}],p=n("AmVM");e.a=function(t){var e=Object(l.useContext)(p.a).state.loggedIn,n=Object(l.useState)(h),i=n[0],r=n[1];return Object(l.useEffect)((function(){e&&r(d)}),[]),Object(a.jsxs)("div",{children:[Object(a.jsx)(c.a,{children:Object(a.jsx)("title",{children:"Burless"})}),Object(a.jsxs)("div",{className:"row",children:[Object(a.jsx)("div",{className:"col-3 ",children:Object(a.jsx)(u,{navButtons:i})}),Object(a.jsx)("div",{className:"col-9",children:Object(a.jsx)("div",{className:"Content",children:t.children})})]})]})}},"Mk/8":function(t,e,n){"use strict"},Qi1R:function(t,e){t.exports={checkLinkId:function(t){return t.match("^(?![A-Za-z]+$)[0-9A-Za-z]+$")||t.match("^[a-zA-Z]+$")},nameValidation:function(t,e){return""===e.trim()?"".concat(t," is required"):/[^a-zA-Z -]/.test(e)?"Invalid characters":e.trim().length<3?"".concat(t," needs to be at least three characters"):null},emailValidation:function(t){return/^[a-zA-Z0-9.!#$%&\u2019*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(t)?null:""===t.trim()?"Email is required":"Please enter a valid email"},passwordValidation:function(t){return""===t.trim()?"Password is required":t.trim().length<6?"Password needs to be at least six characters":null},redirectLogin:function(){return{props:{},redirect:{destination:"/",permanent:!1}}}}},"W+IF":function(t,e,n){"use strict";n.r(e),n.d(e,"__N_SSP",(function(){return c}));var a=n("nKUr"),i=n("G9T2");n("q1tI"),n("Mk/8"),n("vDqi"),n("Qi1R");var c=!0;e.default=function(t){return Object(a.jsx)(i.a,{children:"Profile"})}},g4pe:function(t,e,n){t.exports=n("8Kt/")},u1GD:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return n("W+IF")}])}},[["u1GD",0,2,1,3,4,5]]]);