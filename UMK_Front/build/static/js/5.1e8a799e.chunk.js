(this["webpackJsonpavn-umk-frontend"]=this["webpackJsonpavn-umk-frontend"]||[]).push([[5],{128:function(e,t,a){e.exports={page:"login_page__2BTIy",container:"login_container__1SL6x",title:"login_title__35_yE",submit:"login_submit__3nUmS",form:"login_form__2i6Zx",field:"login_field__1vMUZ",button:"login_button__1kkJw"}},129:function(e,t,a){e.exports={list:"language_list__2JRBI",inactive:"language_inactive__3ApM6",active:"language_active__N6B2y"}},134:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return k}));var n=a(0),i=a(107),c=a(46),s=a(2),o=a(3),l=a(23),r=a(57),u=a(128),g=a.n(u),d=a(5);function j(e){var t=e.login,a=e.password,n=e.setLogin,c=e.setPassword,s=e.loginRef,o=e.passwordRef,l=e.handleLogin,r=e.isLoading,u=Object(i.a)().t;return Object(d.jsx)("div",{className:g.a.page,children:Object(d.jsx)("div",{className:g.a.container,children:Object(d.jsxs)("div",{className:g.a.form,children:[Object(d.jsx)("h1",{className:g.a.title,children:u("login.title")}),Object(d.jsxs)("div",{className:g.a.field,children:[Object(d.jsx)("input",{type:"text",placeholder:u("login.login"),name:"login",value:t,onChange:function(e){return n(e.target.value)},ref:s}),Object(d.jsx)("i",{className:"fa fa-user"})]}),Object(d.jsxs)("div",{className:g.a.field,children:[Object(d.jsx)("input",{type:"password",placeholder:u("login.password"),name:"password",value:a,onChange:function(e){return c(e.target.value)},ref:o}),Object(d.jsx)("i",{className:"fa fa-lock"})]}),Object(d.jsx)("div",{className:g.a.submit,children:Object(d.jsx)("button",{className:g.a.button,type:"submit",onClick:l,disabled:r,children:u(r?"loading":"login.sign")})})]})})})}var b=a(129),f=a.n(b);function v(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:60,n="";if(a){var i=new Date;i.setTime(i.getTime()+24*a*60*60*1e3),n="; expires="+i.toUTCString()}document.cookie=e+"="+(t||"")+n+"; path=/"}var O={setCookie:v,getCookie:function(e){var t="; ".concat(document.cookie).split("; ".concat(e,"="));if(2===t.length)return t.pop().split(";").shift()},removeCookie:function(e){v(e,"",-10)},getLocalStorage:function(e){return JSON.parse(localStorage.getItem(e))},setLocalStorage:function(e,t){localStorage.setItem(e,JSON.stringify(t))},removeLocalStorage:function(e){localStorage.removeItem(e)}};function m(){var e=Object(i.a)().i18n,t=function(t){e.changeLanguage(t),O.setLocalStorage("lang",t),O.setCookie("lang",t)};return Object(d.jsxs)("div",{className:f.a.list,children:[Object(d.jsx)("button",{className:"kg"===e.language?f.a.active:f.a.inactive,onClick:function(){return t("kg")},children:"\u041a\u044b\u0440"}),Object(d.jsx)("button",{className:"ru"===e.language?f.a.active:f.a.inactive,onClick:function(){return t("ru")},children:"\u0420\u0443\u0441"}),Object(d.jsx)("button",{className:"en"===e.language?f.a.active:f.a.inactive,onClick:function(){return t("en")},children:"Eng"})]})}var h=a(32),p=a(47),_=a(11);function x(){var e=Object(o.d)(),t=Object(n.useState)(""),a=Object(s.a)(t,2),i=a[0],c=a[1],u=Object(n.useState)(""),g=Object(s.a)(u,2),b=g[0],f=g[1],v=Object(l.c)(p.a),O=Object(s.a)(v,2),x=O[0],k=O[1],N=Object(n.useState)(!1),L=Object(s.a)(N,2),S=L[0],w=L[1],C=Object(n.useRef)(null),y=Object(n.useRef)(null);return!x.isLoading&&x.isAuthenticated&&e("".concat(_.a,"/")),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(m,{}),Object(d.jsx)(j,{login:i,password:b,setLogin:c,setPassword:f,loginRef:C,passwordRef:y,handleLogin:function(t){t.preventDefault(),w(!0),k({isAuthenticated:!1,data:null,isLoading:!0}),r.a.login({login:i,password:b}).then((function(t){var a=t.data,n=(t.status,t.message),i=t.error;w(!1),i?(k({isAuthenticated:!1,data:null,isLoading:!1}),Object(h.a)(n,"error")):(k({isAuthenticated:!0,data:a,isLoading:!1}),Object(h.a)(n,"success"),e("".concat(_.a,"/")))}))},isLoading:S})]})}function k(){var e=Object(i.a)().t;return Object(d.jsxs)("div",{className:"Main",children:[Object(d.jsxs)(c.a,{children:[Object(d.jsx)("meta",{charSet:"utf-8"}),Object(d.jsxs)("title",{children:[e("head.login")," | ",e("head.appTitle")]})]}),Object(d.jsx)(x,{})]})}}}]);
//# sourceMappingURL=5.1e8a799e.chunk.js.map