"use strict";(self.webpackChunkavn_umk_frontend_prod=self.webpackChunkavn_umk_frontend_prod||[]).push([[815],{7815:function(e,n,r){r.r(n),r.d(n,{default:function(){return we}});var t=r(7294),a=r(405),i=r(4478),l=r(2804),o=r(5473),c=r(9711),s=r(6486),u=r(1272),d=r(3162),p=r(4105),f="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",m=r(2864),h=(new Date).getFullYear(),x=(new Date).getMonth(),v=h%100-3,b=h%100-2,k=h%100-1,g=h%100,y=h%100+1,j=[{value:h%100-4,label:"".concat(h-4,"-").concat(h-3)},{value:v,label:"".concat(h-3,"-").concat(h-2)},{value:b,label:"".concat(h-2,"-").concat(h-1)},{value:k,label:"".concat(h-1,"-").concat(h)},{value:g,label:"".concat(h,"-").concat(h+1)},{value:y,label:"".concat(h+1,"-").concat(h+2)}],w=x<8?j[3]:j[4],N=(0,l.cn)({key:"yearListState",default:j}),_=((0,l.cn)({key:"defaultYearState",default:w}),(0,l.cn)({key:"selectedYearState",default:w})),S={value:0,label:"Выберите кафедру"},C=(0,l.cn)({key:"kafedraListState",default:[S]}),P=((0,l.cn)({key:"defaultKafedraState",default:S}),(0,l.cn)({key:"selectedKafedraState",default:S})),Z=(0,l.cn)({key:"umkListState",default:[]}),O=(0,l.cn)({key:"selectedUmkState",default:null}),B=(0,l.cn)({key:"umkDetailListState",default:[]}),z={value:0,label:"Выберите курс"},F=(0,l.cn)({key:"rateListState",default:[z].concat([{value:1,label:"selector.rate1"},{value:2,label:"selector.rate2"},{value:3,label:"selector.rate3"},{value:4,label:"selector.rate4"},{value:5,label:"selector.rate5"},{value:6,label:"selector.rate6"}])}),R=((0,l.cn)({key:"defaultRateState",default:z}),(0,l.cn)({key:"selectedRateState",default:z})),D=r(1562);function E(e,n,r,t,a,i,l){try{var o=e[i](l),c=o.value}catch(e){return void r(e)}o.done?n(c):Promise.resolve(c).then(t,a)}function I(e){return function(){var n=this,r=arguments;return new Promise((function(t,a){var i=e.apply(n,r);function l(e){E(i,t,a,l,o,"next",e)}function o(e){E(i,t,a,l,o,"throw",e)}l(void 0)}))}}var W=function(){var e=I(regeneratorRuntime.mark((function e(n){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.year,e.next=3,D.ZP.post("select/kafedra/list",{year:r});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),A=function(){var e=I(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.ZP.post("select/year/list",{});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=I(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.ZP.post("select/year/default",{});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L={kafedraList:W,yearList:A,yearDefault:T};function Y(e,n,r,t,a,i,l){try{var o=e[i](l),c=o.value}catch(e){return void r(e)}o.done?n(c):Promise.resolve(c).then(t,a)}function H(e){return function(){var n=this,r=arguments;return new Promise((function(t,a){var i=e.apply(n,r);function l(e){Y(i,t,a,l,o,"next",e)}function o(e){Y(i,t,a,l,o,"throw",e)}l(void 0)}))}}var U=function(){var e=H(regeneratorRuntime.mark((function e(n){var r,t,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.year,t=n.kafedra,a=n.rate,e.next=3,D.ZP.post("umk/list",{year:r,kafedra:t,rate:a});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),V=function(){var e=H(regeneratorRuntime.mark((function e(n){var r,t,a,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.rate,t=n.id_typeUmk,a=n.id_discipline,i=n.id_teacher,e.next=3,D.ZP.post("umk/detail",{rate:r,id_discipline:a,id_typeUmk:t,id_teacher:i});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),J={list:U,detail:V},M=r(5893);function Q(e){var n=e.children,r=e.index,t=e.rowSpaner;return 0==r?(0,M.jsxs)("tr",{children:[t," ",n]}):(0,M.jsx)("tr",{children:n})}var K=r(3379),G=r.n(K),X=r(3380),$=r.n(X),q=r(569),ee=r.n(q),ne=r(3565),re=r.n(ne),te=r(9216),ae=r.n(te),ie=r(4589),le=r.n(ie),oe=r(970),ce={};ce.styleTagTransform=le(),ce.setAttributes=re(),ce.insert=ee().bind(null,"head"),ce.domAPI=$(),ce.insertStyleElement=ae(),G()(oe.Z,ce);var se=oe.Z&&oe.Z.locals?oe.Z.locals:void 0,ue=function(e){var n=e.setIsOpen,r=e.title,a=e.children,i=e.isOpen,l=e.id;return(0,t.useEffect)((function(){return document.body.style.overflow=i?"hidden":"unset",function(){return document.body.style.overflow="unset"}}),[]),(0,t.useEffect)((function(){document.body.style.overflow=i?"hidden":"unset"}),[i]),i?(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("div",{className:se.darkBG,onClick:function(){return n(!1)}}),(0,M.jsx)("div",{className:se.centered,children:(0,M.jsxs)("div",{className:se.modal,id:l,children:[(0,M.jsx)("div",{className:se.modalHeader,children:(0,M.jsx)("h5",{className:"".concat(se.heading," text-center"),children:r})}),(0,M.jsx)("button",{className:"".concat(se.closeBtn," no-print"),onClick:function(){return n(!1)},children:(0,M.jsx)("i",{className:"fas fa-close"})}),(0,M.jsx)("div",{className:se.modalContent,children:a})]})})]}):null},de=r(6539),pe={};pe.styleTagTransform=le(),pe.setAttributes=re(),pe.insert=ee().bind(null,"head"),pe.domAPI=$(),pe.insertStyleElement=ae(),G()(de.Z,pe);var fe=de.Z&&de.Z.locals?de.Z.locals:void 0,me=function(e){var n=e.size||"16px",r=e.size||"16px",t=e.color||"#888";return(0,M.jsxs)("div",{className:fe.loader,children:[(0,M.jsx)("div",{className:fe.dot,style:{width:n,height:r,backgroundColor:t}}),(0,M.jsx)("div",{className:fe.dot,style:{width:n,height:r,backgroundColor:t}}),(0,M.jsx)("div",{className:fe.dot,style:{width:n,height:r,backgroundColor:t}})]})};function he(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function xe(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?he(Object(r),!0).forEach((function(n){ve(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):he(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function ve(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function be(e,n,r,t,a,i,l){try{var o=e[i](l),c=o.value}catch(e){return void r(e)}o.done?n(c):Promise.resolve(c).then(t,a)}function ke(e){return function(){var n=this,r=arguments;return new Promise((function(t,a){var i=e.apply(n,r);function l(e){be(i,t,a,l,o,"next",e)}function o(e){be(i,t,a,l,o,"throw",e)}l(void 0)}))}}function ge(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var t,a,i=[],l=!0,o=!1;try{for(r=r.call(e);!(l=(t=r.next()).done)&&(i.push(t.value),!n||i.length!==n);l=!0);}catch(e){o=!0,a=e}finally{try{l||null==r.return||r.return()}finally{if(o)throw a}}return i}}(e,n)||function(e,n){if(e){if("string"==typeof e)return ye(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ye(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ye(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}function je(){var e=(0,i.$)().t,n=ge((0,l.FV)(m.K),2),r=(n[0],n[1],ge((0,l.FV)(N),2)),a=r[0],h=(r[1],ge((0,l.FV)(_),2)),x=h[0],v=h[1],b=ge((0,l.FV)(C),2),k=b[0],g=b[1],y=(0,l.rb)(C),j=ge((0,l.FV)(P),2),w=j[0],S=j[1],z=(0,l.rb)(P),E=ge((0,l.FV)(Z),2),I=E[0],W=E[1],A=(0,l.rb)(Z),T=ge((0,l.FV)(B),2),Y=T[0],H=T[1],U=(0,l.rb)(B),V=ge((0,l.FV)(O),2),K=V[0],G=V[1],X=((0,l.rb)(O),ge((0,l.FV)(F),2)),$=X[0],q=(X[1],ge((0,l.FV)(R),2)),ee=q[0],ne=q[1],re=(0,l.rb)(R),te=ge((0,t.useState)([]),2),ae=te[0],ie=te[1],le=ge((0,t.useState)(null),2),oe=le[0],ce=le[1],se={discipline:0,teacher:"0/0"},de=ge((0,t.useState)(se),2),pe=de[0],fe=de[1],he=ge((0,t.useState)(!1),2),ve=he[0],be=he[1],ye=function(){return fe(se)},je=function(){return ie([])},we=function(){var e=ke(regeneratorRuntime.mark((function e(){var n,r,t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L.yearDefault();case 2:n=e.sent,r=n.data,t=n.message,n.error&&(0,u.h)(t,"error"),r&&v({value:r.id,label:r.name});case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ne=function(){var n=ke(regeneratorRuntime.mark((function n(){var r,t,a,i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return ce(e("umk:report.load.kafedra")),console.time("kafedra"),n.next=4,L.kafedraList({year:x.value});case 4:if(r=n.sent,t=r.data,a=r.message,r.error&&(0,u.h)(a,"error"),0!==t.length){n.next=13;break}return(0,u.h)(e("selector.noKafedra"),"error"),ce(null),n.abrupt("return");case 13:i=t.map((function(e){return{value:e.id_kafedra,label:e.name}})),g(i),ce(null),console.timeEnd("kafedra");case 17:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),_e=function(){var n=ke(regeneratorRuntime.mark((function n(){var r,t,a,i,l,o,c,d,p,f;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!(k.length<1||0===w.value||0===ee.value)){n.next=2;break}return n.abrupt("return");case 2:return console.time("getUmkList"),ce(e("umk:report.load.umk")),n.next=6,J.list({year:x.value,kafedra:w.value,rate:ee.value});case 6:if(r=n.sent,t=r.data,a=r.message,i=r.error,ce(null),console.timeEnd("getUmkList"),!i){n.next=17;break}return(0,u.h)(a,"error"),W([]),ie([]),n.abrupt("return");case 17:if(0!==(null==t?void 0:t.length)){n.next=22;break}return(0,u.h)(e("umk:report.noData"),"error"),W([]),ie([]),n.abrupt("return");case 22:ce(e("umk:report.load.render")),console.time("render"),l=(0,s.sortBy)(t,["p34","s_t_fio"],["asc","asc"]),o=(0,s.chain)(l).groupBy((function(e){return e.p34})).map((function(e,n){return{discipline_name:n,disciplines:(0,s.chain)(e).groupBy((function(e){return e.s_t_fio})).map((function(e,n){return{teacher_name:n,teacher_id:e[0].id_teacher,types:(0,s.chain)(e).groupBy((function(e){return e.umkName})).map((function(e,n){return{umk_name:n,kol:(0,s.sumBy)(e,"kol"),umks:e}})).value()}})).value()}})).value(),W(o),c=(0,s.uniqBy)(t,(function(e){return e.umkName})).sort((function(e,n){return e.sort>n.sort})).map((function(e){return e.umkName})),d={},c.forEach((function(e){var n=t.filter((function(n){return n.umkName===e})).reduce((function(e,n){return-1==n.id_teacher?e+1:(d.all=d.all?d.all+n.kol:n.kol,e+n.kol)}),0);d[e]=n})),ie(c),p=o.map((function(e){return e.disciplines.map((function(e){return e.teacher_id}))})).flat().filter((function(e){return e>0})),f=new Set(p),fe(xe({discipline:o.length,teacher:"".concat(f.size," / ").concat(p.length)},d)),ce(null),console.timeEnd("render");case 36:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),Se=function(){var n=ke(regeneratorRuntime.mark((function n(r){var t,a,i,l,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.time("getUmkDetails"),ce(e("umk:report.load.details")),n.next=4,J.detail({rate:ee.value,id_discipline:r.id_discipline,id_typeUmk:r.id_typeUmk,id_teacher:r.id_teacher});case 4:if(t=n.sent,a=t.data,i=t.status,l=t.message,o=t.error,ce(null),console.timeEnd("getUmkDetails"),!o){n.next=15;break}return(0,u.h)(l,"error"),H([]),n.abrupt("return");case 15:if(404!==i){n.next=19;break}return(0,u.h)(e("umk:report.noData"),"error"),H([]),n.abrupt("return");case 19:H(a);case 20:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),Ce=["csv","xlsx","jpg","jpeg","gif","gif","png","pdf","docx","mp3","webm","mp4","wexbim"],Pe=function(e){return e.split(".").pop()},Ze=function(e,n){!function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"export_table",r=document.getElementById(e),t=p.P6.table_to_book(r),a=p.cW(t,{bookType:"xlsx",type:"array"}),i=new Blob([a],{type:f});d.saveAs(i,n+".xlsx")}(e,n)};return(0,t.useEffect)((function(){we()}),[]),(0,t.useEffect)((function(){z(),y(),re(),A(),ye(),je(),Ne()}),[x]),(0,t.useEffect)((function(){A(),re(),ye(),je()}),[w]),(0,t.useEffect)((function(){A(),ye(),je(),_e()}),[ee]),(0,M.jsxs)("div",{className:"UMKContainer",children:[(0,M.jsxs)("div",{className:"Selectors_Wrapper no-print",children:[(0,M.jsx)(c.OL,{to:"/avnumk/",children:(0,M.jsx)("button",{title:e("back"),children:(0,M.jsx)("i",{className:"fas fa-arrow-left"})})}),(0,M.jsx)(o.ZP,{className:"Select",classNamePrefix:"my_select",value:x,isSearchable:!1,placeholder:e("selector.choose"),onChange:function(e){v(e)},options:null==a?void 0:a.map((function(e){return e}))}),(0,M.jsx)(o.ZP,{className:"Select",classNamePrefix:"my_select",value:w,isSearchable:!0,placeholder:e("cm:selector.choose"),onChange:function(e){S(e)},options:null==k?void 0:k.map((function(n){return{value:n.value,label:e(n.label)}}))}),(0,M.jsx)(o.ZP,{className:"Select",classNamePrefix:"my_select",value:ee,isSearchable:!1,placeholder:e("cm:selector.choose"),onChange:function(n){0===w.value&&k.length>1?(0,u.h)(e("selector.chooseDeparment"),"error"):ne(n)},options:null==$?void 0:$.map((function(n){return{value:n.value,label:e(n.label)}}))}),(0,M.jsx)("div",{children:oe?(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(me,{size:"15px",color:"blue"}),oe]}):null}),(0,M.jsx)("div",{className:"flex",children:(null==I?void 0:I.length)>0&&!ve?(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("button",{className:"Button",title:e("export"),onClick:function(){Ze("listTable","УМК_".concat(null==x?void 0:x.label,"_").concat(w.label,"_").concat(ee.label))},children:(0,M.jsx)("i",{className:"fa fa-file-export"})}),(0,M.jsx)("button",{className:"Button",title:e("print"),onClick:function(){w.value&&ee.value&&x.value?window.print():(0,u.h)(e("umk:report.noData"),"error")},children:(0,M.jsx)("i",{className:"fas fa-print"})})]}):null})]}),(0,M.jsx)(ue,{title:null==K?void 0:K.umkName,isOpen:ve,setIsOpen:function(e){be(e)},id:"modalDetail",children:(0,M.jsxs)("div",{children:[(0,M.jsxs)("div",{className:"text-left",children:[(0,M.jsx)("p",{children:(0,M.jsxs)("small",{children:[e("umk:report.kafedra"),": ",w.label]})}),(0,M.jsx)("p",{children:(0,M.jsxs)("small",{children:[e("umk:report.rate"),": ",null==K?void 0:K.rate]})}),(0,M.jsx)("p",{children:(0,M.jsxs)("small",{children:[e("umk:report.discipline"),": ",null==K?void 0:K.p34]})}),(0,M.jsx)("p",{children:(0,M.jsxs)("small",{children:[e("umk:report.teacher"),": ",null==K?void 0:K.s_t_fio]})}),(0,M.jsx)("br",{}),(0,M.jsx)("div",{className:"no-print flex",children:(null==Y?void 0:Y.length)>0&&ve?(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("button",{className:"Button",title:e("export"),onClick:function(){Ze("detailTable","УМК_".concat(null==K?void 0:K.umkName,"_").concat(w.label,"_").concat(ee.label,"_").concat(null==K?void 0:K.p34,"_").concat(null==K?void 0:K.s_t_fio))},children:(0,M.jsx)("i",{className:"fa fa-file-export"})}),(0,M.jsx)("button",{className:"Button",title:e("print"),onClick:function(){K?function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Printer",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",t=document.getElementById("printWindow");t&&document.body.removeChild(t);var a=document.createElement("iframe");a.style.position="absolute",a.style.top="-1000px",a.style.left="-1000px",a.id="printWindow";var i="<html><head><title>".concat(n,"</title></head><body><style>").concat(r,"</style>").concat(e,"</body></html>");document.body.appendChild(a),a.contentWindow.document.open(),a.contentWindow.document.write(i),a.contentWindow.document.close(),a.contentWindow.print()}(document.getElementById("modalDetail").innerHTML,e("head.umk"),"h5 {text-align: center; margin: 0; margin-bottom: 20px; font-size: 18px;}\n      table { border-collapse: collapse; background-color: #fff; width: 100%; font-size: 14px;}\n      td.break { float: left; line-height: 22px;}\n      td, th { padding: 5px 10px; height: 35px; border: 1px solid #606060 !important;}\n      table thead tr, table tbody td, small { color: black !important; }\n      .no-print, .no-print-child, .no-print-child * { display: none !important; }\n      p { margin: 0; padding: 5px; }\n      .text-center { text-align: center;}\n      .text-left { text-align: left;}\n      .text-right { text-align: right;}"):(0,u.h)(e("umk:report.noData"),"error")},children:(0,M.jsx)("i",{className:"fas fa-print"})})]}):null})]}),Y.length>0?(0,M.jsx)(M.Fragment,{children:(0,M.jsxs)("table",{id:"detailTable",children:[(0,M.jsx)("thead",{children:(0,M.jsxs)("tr",{children:[(0,M.jsx)("th",{width:"5%",children:"№"}),(0,M.jsx)("th",{children:e("umk:report.table.name")}),(0,M.jsx)("th",{children:e("umk:report.table.description")}),(0,M.jsx)("th",{children:e("umk:report.table.semester")}),(0,M.jsx)("th",{children:e("umk:report.table.file")}),(0,M.jsx)("th",{className:"no-print",children:e("umk:report.table.download")}),(0,M.jsx)("th",{className:"no-print",children:e("umk:report.table.view")})]})}),(0,M.jsx)("tbody",{children:Y.map((function(n,r){return(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:r+1}),(0,M.jsx)("td",{children:n.name}),(0,M.jsx)("td",{children:n.description}),(0,M.jsx)("td",{children:n.p43}),(0,M.jsx)("td",{children:n.fileName}),(0,M.jsx)("td",{className:"no-print",children:(0,M.jsx)("span",{className:"pointer",title:e("umk:report.table.downloadTitle"),onClick:function(){return r=(e={id:n.id,name:n.fileName}).name,t="".concat(e.id,"_").concat(encodeURIComponent(r)),a="".concat(D.v2,"/umk/download?file=").concat(t),void window.open(a,"_blank");var e,r,t,a},children:(0,M.jsx)("i",{className:"fas fa-download"})})}),(0,M.jsx)("td",{className:"no-print",children:(t=Pe(n.fileName),Ce.includes(t)?(0,M.jsxs)("span",{className:"pointer",title:e("umk:report.table.viewTitle"),onClick:function(){return function(e){var n=e.name,r="".concat(e.id,"_").concat(encodeURIComponent(n)),t=Pe(r),a="/avnumk/view?file=".concat(r,"&type=").concat(t);window.open(a,"_blank")}({id:n.id,name:n.fileName})},children:[" ",(0,M.jsx)("i",{className:"fas fa-eye"})]}):null)})]},n.id);var t}))})]})}):null]})}),(0,M.jsxs)("div",{className:"A4",id:"A4",children:[(0,M.jsxs)("div",{className:"text-left",children:[(0,M.jsx)("p",{children:(0,M.jsxs)("small",{children:[e("umk:report.year"),": ",x.label]})}),(0,M.jsx)("p",{children:(0,M.jsxs)("small",{children:[e("umk:report.kafedra"),": ",w.label]})}),(0,M.jsx)("p",{children:(0,M.jsxs)("small",{children:[e("umk:report.rate"),": ",ee.label]})}),(0,M.jsx)("br",{})]}),(0,M.jsxs)("table",{id:"listTable",children:[(0,M.jsx)("thead",{children:(0,M.jsxs)("tr",{children:[(0,M.jsx)("th",{width:"5%",children:e("umk:report.discipline")}),(0,M.jsx)("th",{children:e("umk:report.teacher")}),ae.map((function(e){return(0,M.jsx)("th",{children:e},e)}))]})}),(0,M.jsxs)("tbody",{children:[null==I?void 0:I.map((function(e,n){return e.disciplines.map((function(n,r){return(0,M.jsxs)(Q,{index:r,rowSpaner:(0,M.jsx)("td",{rowSpan:e.disciplines.length,children:e.discipline_name}),children:[(0,M.jsx)("td",{children:n.teacher_name}),ae.map((function(e,r){var t=n.types.filter((function(n){return n.umk_name==e}))[0];return null!=t&&t.umks.length?(0,M.jsx)("td",{children:(0,M.jsx)("div",{className:"umkCount",onClick:function(){return function(e){U(),be(!0),G(e),Se(e)}(null==t?void 0:t.umks[0])},children:null==t?void 0:t.kol})},r+""+(null==t?void 0:t.umk_name)):(0,M.jsx)("td",{children:"-"})}))]})}))})),pe.all&&(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)("tr",{children:[(0,M.jsxs)("td",{children:[(0,M.jsxs)("b",{children:[e("umk:report.summary.disciplines"),":"]})," ",null==pe?void 0:pe.discipline]}),(0,M.jsxs)("td",{children:[e("umk:report.summary.teachers")," ",(0,M.jsx)("br",{})," ",null==pe?void 0:pe.teacher]}),ae.map((function(e){return(0,M.jsxs)("td",{children:[e," ",(0,M.jsx)("br",{}),pe[e]]},e)}))]}),(0,M.jsx)("tr",{children:(0,M.jsxs)("td",{colSpan:2+(null==ae?void 0:ae.length),children:[e("umk:report.summary.all"),": ",null==pe?void 0:pe.all]})})]})]})]})]})]})}function we(){var e=(0,i.$)().t;return(0,M.jsxs)("div",{className:"Main",children:[(0,M.jsxs)(a.ql,{children:[(0,M.jsx)("meta",{charSet:"utf-8"}),(0,M.jsxs)("title",{children:[e("head.umk")," | ",e("head.appTitle")]})]}),(0,M.jsx)(je,{})]})}r(7881)},970:function(e,n,r){var t=r(8081),a=r.n(t),i=r(3645),l=r.n(i)()(a());l.push([e.id,"/* @src/components/Modal/Modal.module.css */\r\n\r\n.P09pHDJA4IJufHl0nveF {\r\n  /* background-color: rgba(0, 0, 0, 0.2);\r\n  width: 100vw;\r\n  height: 100vh;\r\n   top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  position: absolute; */\r\n  background-color: rgba(0, 0, 0, 0.2);\r\n  width: 100vw;\r\n  height: 100vh;\r\n  z-index: 222;\r\n  top: 0;\r\n  right: 0;\r\n  position: fixed;\r\n}\r\n\r\n.uuISBWaafa89zOaYa0g0 {\r\n  z-index: 230;\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\n.EskRGW7HzoWZ5YC8zQ2y {\r\n  position: relative !important;\r\n  background: white;\r\n  color: white;\r\n  z-index: 230;\r\n  border-radius: 16px;\r\n  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);\r\n  padding: 30px;\r\n}\r\n\r\n.Jg_5ebYQCVhivaldP7bc {\r\n  height: 50px;\r\n  background: white;\r\n  overflow: hidden;\r\n  border-top-left-radius: 16px;\r\n  border-top-right-radius: 16px;\r\n}\r\n\r\n.k4umXxCMCzLZyNRWP7Z0 {\r\n  margin: 0;\r\n  padding: 10px;\r\n  color: #2c3e50;\r\n  font-weight: 500;\r\n  font-size: 18px;\r\n  text-align: center;\r\n}\r\n\r\n.oXbN3zIrwnbECjtwlFSc {\r\n  padding: 10px;\r\n  font-size: 14px;\r\n  color: #2c3e50;\r\n  text-align: center;\r\n  width: 80vw;\r\n  height: 60vh;\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n}\r\n\r\n.QedpdSxZBkr896CcOJOE {\r\n  cursor: pointer;\r\n  font-weight: 500;\r\n  padding: 4px 8px;\r\n  border-radius: 8px;\r\n  border: none;\r\n  font-size: 18px;\r\n  color: #004da0d8 !important;\r\n  background: white;\r\n  transition: all 0.25s ease;\r\n  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);\r\n  position: absolute !important;\r\n  right: 0;\r\n  top: 0;\r\n  align-self: flex-end;\r\n  margin-top: -7px;\r\n  margin-right: -7px;\r\n}\r\n\r\n.QedpdSxZBkr896CcOJOE:hover {\r\n  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);\r\n  transform: translate(-4px, 4px);\r\n}\r\n",""]),l.locals={darkBG:"P09pHDJA4IJufHl0nveF",centered:"uuISBWaafa89zOaYa0g0",modal:"EskRGW7HzoWZ5YC8zQ2y",modalHeader:"Jg_5ebYQCVhivaldP7bc",heading:"k4umXxCMCzLZyNRWP7Z0",modalContent:"oXbN3zIrwnbECjtwlFSc",closeBtn:"QedpdSxZBkr896CcOJOE"},n.Z=l},6539:function(e,n,r){var t=r(8081),a=r.n(t),i=r(3645),l=r.n(i)()(a());l.push([e.id,".Bdw9FH3k9t6D0akYsdfz {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.nFIpfyZB2hRdRDLdNzNW {\r\n  /* width: 16px;\r\n  height: 16px; */\r\n  margin: 3px 6px;\r\n  border-radius: 50%;\r\n  opacity: 1;\r\n  animation: Bdw9FH3k9t6D0akYsdfz 0.6s infinite alternate;\r\n}\r\n\r\n@keyframes Bdw9FH3k9t6D0akYsdfz {\r\n  to {\r\n    opacity: 0.1;\r\n    transform: translateY(-16px);\r\n  }\r\n}\r\n\r\n.Bdw9FH3k9t6D0akYsdfz > div:nth-child(2) {\r\n  animation-delay: 0.2s;\r\n}\r\n\r\n.Bdw9FH3k9t6D0akYsdfz > div:nth-child(3) {\r\n  animation-delay: 0.4s;\r\n}\r\n",""]),l.locals={loader:"Bdw9FH3k9t6D0akYsdfz",dot:"nFIpfyZB2hRdRDLdNzNW"},n.Z=l},7789:function(e,n,r){var t=r(8081),a=r.n(t),i=r(3645),l=r.n(i)()(a());l.push([e.id,".Selectors_Wrapper {\r\n  display: grid;\r\n  grid-template-columns: auto 140px 200px 140px 1fr 150px;\r\n  grid-gap: 20px;\r\n}\r\n.umkCount {\r\n  cursor: pointer;\r\n}\r\n",""]),n.Z=l},7881:function(e,n,r){var t=r(3379),a=r.n(t),i=r(3380),l=r.n(i),o=r(569),c=r.n(o),s=r(3565),u=r.n(s),d=r(9216),p=r.n(d),f=r(4589),m=r.n(f),h=r(7789),x={};x.styleTagTransform=m(),x.setAttributes=u(),x.insert=c().bind(null,"head"),x.domAPI=l(),x.insertStyleElement=p(),a()(h.Z,x),h.Z&&h.Z.locals&&h.Z.locals}}]);