var app;(()=>{var e={389:(e,r,t)=>{const o=t(860),s=t(455);t(142).config();const n=t(423),a=t(710),i=t(470),c=(t(806),t(582),o()),u=t(924),l=(t(163),t(876)),p=t(520),d=process.env.APP_URL,g=process.env.API_VERSION;c.use(o.json()),c.use(o.urlencoded({extended:!1})),c.use(a()),c.use(s()),c.use(l),console.debug("production ВСЕ OK"),c.all("*",(function(e,r,t){r.header("Access-Control-Allow-Origin","http://avn.ksla.kg"),r.header("Access-Control-Allow-Credentials","true"),r.header("Access-Control-Allow-Methods","PUT, GET, POST, DELETE, OPTIONS"),r.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization"),t()})),c.use(i("tiny")),c.use("/public",o.static(n.join(__dirname,"public"))),c.use(`/${d}/public`,o.static(n.join(__dirname,"public"))),c.all("/",(async function(e,r){return r.header("Access-Control-Allow-Origin","*"),r.sendFile(n.join(__dirname,"public","index.html"))})),c.use(`/api/${g}`,p),c.use(`/${d}/api/${g}`,p),c.use((function(e,r,t){return r.sendFile(n.join(__dirname,"public","index.html"))})),c.use((function(e,r,t,o){return t.locals.message=e.message,t.locals.error="development"===r.app.get("env")?e:{},console.log(e.message),u(t,!1,e.message,!0,e.status||500)})),e.exports=c},193:(e,r,t)=>{t(142).config();const o=process.env.DBTYPE;if("MS"===o){const{sql:r,poolPromise:o,getConnected:s,queryPool:n,connectWithLogin:a,connectWithCookie:i}=t(462);e.exports={sql:r,poolPromise:o,getConnected:s,queryPool:n,connectWithLogin:a,connectWithCookie:i}}if("PG"===o){const{query:r,getConnected:o}=t(335);e.exports={sql:()=>!1,poolPromise:()=>!1,getConnected:o,queryPool:r,connectWithLogin:()=>!1,connectWithCookie:()=>!1}}},502:(e,r,t)=>{t(142).config();const o=t(219),s=t(924),{md5:n}=t(490),{loginSchema:a}=t(765),i=t(992),{sql:c,poolPromise:u,getConnected:l,connectWithLogin:p}=t(193);e.exports=new class{async login(e,r){try{if(!o(e.body,a))return s(r,!1,e.t("auth.inValidFormat"),!0,400);const{login:t,password:d}=e.body,g=n(d),_=l()?await u():await p(t,g);if(0==_)return s(r,!1,e.t("auth.inValidAuth"),!0,401);const m=process.env.ID_PROG_ID,{recordsets:h}=await _.input("login",c.NVarChar,t).input("password",c.NVarChar,g).input("prog",c.VarChar,m).execute("SP_AVN_Login");if(h&&h.length&&h[0]&&h[0].length){const{id_avn_user:t,id_user:o,id_role:n}=h[0][0];if(await i.LOGIN(e,r,n,t,o))return s(r,{id_role:n,id_avn_user:t,id_user:o},e.t("auth.welcome"))}return s(r,!1,e.t("auth.inValidAuth"),!0,401)}catch(t){return console.log(t),s(r,!1,e.t("auth.failLoginError",{error:t.message}),!0,500)}}async check(e,r){try{if(await i.CHECK_PERM(e,r)){const t=await i.GET_USER(e);return s(r,t,e.t("auth.welcome"))}return s(r,!1,e.t("auth.inputAuth"),!0,401)}catch(t){return console.log(t),s(r,!1,e.t("auth.failLoginError",{error:t.message}),!0,500)}}async logout(e,r){try{return await i.LOGOUT(e,r),r.clearCookie(i.COOKIE_NAME),s(r,!0,e.t("auth.loggedOut"))}catch(t){return console.log(t),r.clearCookie(i.COOKIE_NAME),s(r,!1,e.t("auth.failLogoutError",{error:t.message}),!0,500)}}}},556:(e,r,t)=>{const o=t(992),{sql:s,poolPromise:n}=t(193),a=t(924),{kafedraSchema:i}=(t(219),t(647)),{kafedraListByUserDB:c}=t(102);e.exports=new class{async yearDefault(e,r){try{const t="SELECT id_a_year as id, p32 AS name FROM V_GetCurrentAcademicIdYear",o=await n();let s=(await o.query(t)).recordset[0];return a(r,s,e.t("selector.yearDefaultOK"))}catch(t){return console.log(t),a(r,!1,e.t("errorQuery",{error:t.message}),!0,500)}}async yearList(e,r){try{const t="\n        SELECT id_a_year as id, p32 AS name\n        FROM a_year\n        WHERE (u_god BETWEEN YEAR(GETDATE()) - 4 AND YEAR(GETDATE()) + 1)",o=await n();let s=(await o.query(t)).recordset;return a(r,s,e.t("selector.yearListOK"))}catch(t){return console.log(t),a(r,!1,e.t("errorQuery",{error:t.message}),!0,500)}}async kafedraList(e,r){try{const{id_avn_user:t}=await o.GET_USER(e),{data:s,error:n}=await c({id_avn_user:t});return n?a(r,!1,e.t("errorQuery",{error:n}),!0,400):a(r,s,e.t("selector.kafedraListOK"))}catch(t){return console.log(t),a(r,!1,e.t("errorQuery",{error:t.message}),!0,500)}}}},151:(e,r,t)=>{t(142).config();const{sql:o,poolPromise:s}=t(193),n=(t(992),t(924)),a=t(219),{listSchema:i,detailSchema:c,downloadSchema:u}=t(192),{listDB:l,detailDB:p}=t(995),{exists:d}=t(471);e.exports=new class{async list(e,r){try{if(!a(e.body,i))return n(r,!1,e.t("inValidFormat"),!0,400);const{data:t,error:o}=await l(e.body);return o?n(r,!1,e.t("errorQuery",{error:o}),!0,400):n(r,t,e.t("umk.umkListOK"))}catch(t){return console.log(t),n(r,!1,e.t("errorQuery",{error:t.message}),!0,500)}}async detail(e,r){try{if(!a(e.body,c))return n(r,!1,e.t("inValidFormat"),!0,400);const{data:t,error:o}=await p(e.body);return o?n(r,!1,e.t("errorQuery",{error:o}),!0,400):n(r,t,e.t("umk.umkDetailOK"))}catch(t){return console.log(t),n(r,!1,e.t("errorQuery",{error:t.message}),!0,500)}}async download(e,r){try{if(!a(e.query,u))return n(r,!1,e.t("inValidFormat"),!0,400);const{file:t}=e.query,o=`${process.env.UMK_PATH}${decodeURIComponent(t)}`;return await d(o)?r.download(o):n(r,!1,e.t("umk.umkDownloadError"),!0,400)}catch(t){return console.log(t),n(r,!1,e.t("errorQuery",{error:t.message}),!0,500)}}}},992:(e,r,t)=>{t(142).config();const o=process.env.DBTYPE;if("MS"===o){const{LOGIN:r,LOGOUT:o,CHECK_PERM:s,GET_USER:n,COOKIE_NAME:a}=t(801);e.exports={LOGIN:r,LOGOUT:o,CHECK_PERM:s,GET_USER:n,COOKIE_NAME:a}}if("PG"===o){const{LOGIN:r,LOGOUT:o,CHECK_PERM:s,GET_USER:n,COOKIE_NAME:a}=t(335);e.exports={LOGIN:r,LOGOUT:o,CHECK_PERM:s,GET_USER:n,COOKIE_NAME:a}}},520:(e,r,t)=>{const o=t(860).Router();t(142).config();const s=t(514),n=t(502),a=t(556),i=t(151);o.post("/auth/login",n.login),o.post("/auth/check",n.check),o.get("/auth/logout",n.logout),o.post("/select/year/default",s,a.yearDefault),o.post("/select/year/list",s,a.yearList),o.post("/select/kafedra/list",s,a.kafedraList),o.post("/umk/list",s,i.list),o.post("/umk/detail",s,i.detail),o.get("/umk/download",s,i.download),e.exports=o},462:(e,r,t)=>{const o=t(424);t(142).config();const s=t(33),{md5:n,format:a}=t(490),i=process.env.ID_PROG_ID;let c={user:process.env.DBUSER,password:process.env.DBPASSWORD,server:process.env.DBSERVER,database:process.env.DBNAME,stream:!!parseInt(process.env.DBMS_STREAM),requestTimeout:parseInt(process.env.DBMS_REQUESTTIMEOUT),options:{encrypt:!!parseInt(process.env.DBMS_ENCRYPT)}};const u=new o.ConnectionPool(c).connect().then((e=>(console.log("Connected to Auth MSSQL"),e))).catch((e=>console.log("Database Auth Connection Failed! Bad Config: ",e)));let l=!1,p=null;async function d(e,r){const t=s(e,1),n=s(r,1);return console.log("connectWithSQL",t,n),c={...c,user:t,password:n},p=new o.ConnectionPool(c).connect().then((e=>(console.log("Connected to MSSQL"),l=!0,(e=>{p=e})(e),e.request()))).catch((e=>(console.log("Database Connection Failed! Bad Config: ",e),!1))),p}e.exports={sql:o,poolPromise:()=>null!=p&&p.request(),getConnected:()=>l,queryPool:(e,r)=>null!=p&&p.request().query(a(e,r)),connectWithLogin:async function(e,r){const t=await u;let s=await t.request().input("Login",o.NVarChar,e).input("Passw",o.NVarChar,r).input("NewPassw",o.NVarChar,null).input("AVN_Prog",o.NVarChar,i).input("ip",o.NVarChar,"192.168.100.50").input("compName",o.NVarChar,"TOICHUBEK").input("inputLogin",o.NVarChar,e).input("isWeb",o.NVarChar,"0").input("newPasswLn",o.NVarChar,"4").execute("GET_USER");const{login:n,password:a}=s.recordset[0];return null!=n&&await d(n,a)},connectWithCookie:async function(e){const r=await u;let t=await r.request().input("Cookie",o.NVarChar,e).input("AVN_Prog",o.NVarChar,i).execute("GET_USER_COOKIE");if(t&&t.recordset[0]&&t.recordset[0].login){const{id_avn_user:e,id_user:r,id_role:o,last_login:s,id_session:n,login:a,password:i}=t.recordset[0];return await d(a,i)}return!1}}},335:(e,r,t)=>{const{Pool:o}=t(900);t(142).config();const s=new o({host:process.env.DBSERVER,port:process.env.DBPORT,database:process.env.DBNAME,user:process.env.DBUSER,password:process.env.DBPASSWORD,max:parseInt(process.env.DBPG_MAX_CONNECTIONS),idleTimeoutMillis:parseInt(process.env.DBPG_IDLETIMEOUTMILLLIS),connectionTimeoutMillis:parseInt(process.env.DBPG_CONNECTIONTIMEOUTMILLES)});async function n(e,r){try{return res=await s.query(e,r),res}catch(e){return{err:1}}}e.exports={query:(e,r)=>n(e,r),callback:(e,r,t)=>s.query(e,r,t),getConnected:()=>async function(){try{const{rowCount:e}=await n("SELECT 1",[]);return!!e}catch(e){return console.log("err getConnected ==>",e),!1}}()}},33:e=>{e.exports=(e,r)=>{let t="";for(let o=0;o<e.length;o++){let s=e[o];const n=e.charCodeAt(o);s=String.fromCharCode(n+r),t+=s}return t}},514:(e,r,t)=>{const o=t(992),s=t(924);t(142).config(),e.exports=async function(e,r,t){if(!await o.CHECK_PERM(e,r))return s(r,!1,e.t("token.noAuth"),!0,401);t()}},801:(e,r,t)=>{const{md5:o}=t(490);t(142).config();const{sql:s,poolPromise:n,getConnected:a,connectWithLogin:i,connectWithCookie:c}=t(462),u=process.env.COOKIE_NAME,l=process.env.COOKIE_MOBILE,p=process.env.ID_PROG_ID,d=process.env.MAX_AGE;async function g(e){const r=String(e.cookies[u]);if("undefined"==r)return!1;const t=o(r),i=a()?await n():await c(t);if(i&&i.parent.connected){const{recordset:e}=await i.input("Cookie",s.VarChar(50),t).input("AVN_Prog",s.VarChar(32),p).execute("SP_AVN_Cookie_Check");if(e&&e.length)return{...e[0]}}return!1}e.exports.LOGIN=async function(e,r,a,i,c){const g="true"==String(e.cookies[l])?1:0,_=o(await async function(e){const{v4:r}=t(828),o=r();return e.cookie(u,o,{maxAge:d,httpOnly:!0}),o}(r)),m=await n(),{recordset:h}=await m.input("id_avn_user",s.Int,i).input("id_user",s.Int,c).input("id_role",s.Int,a).input("is_mobile",s.Bit,g).input("Cookie",s.VarChar(50),_).input("AVN_Prog",s.VarChar(32),p).execute("SP_AVN_Cookie_Generate");return!(!h||!h.length||!h[0].id_role)},e.exports.LOGOUT=async function(e,r){const t=String(e.cookies[u]);r.clearCookie(u);const o=a()?await n():await c(t),{recordset:i}=await o.input("Cookie",s.VarChar(50),t).input("AVN_Prog",s.VarChar(32),p).execute("SP_AVN_Cookie_Delete");return!!i[0].offline},e.exports.CHECK_PERM=async function(e,r){const t=await g(e);return!(!t||!t.online)||(r.clearCookie(u),!1)},e.exports.GET_USER=g,e.exports.COOKIE_NAME=u},471:(e,r,t)=>{t(142).config();const o=t(147);e.exports={exists:async e=>!!await o.promises.stat(e).catch((e=>("true"===process.env.DEBUG_MODE&&console.debug(e),!1))),deleteFile:async e=>await o.promises.unlink(e).catch((e=>("true"===process.env.DEBUG_MODE&&console.debug(e),!1))),listDir:async e=>await o.promises.readdir(e).catch((e=>("true"===process.env.DEBUG_MODE&&console.debug(e),[])))}},876:(e,r,t)=>{const o=t(805),s=t(763),n=t(379),a={ru:{translation:t(234)},kg:{translation:t(845)},en:{translation:t(264)}};o.use(s).use(n.LanguageDetector).init({resources:a,defaultNS:"translation",detection:{order:["querystring","cookie"],cache:["cookie"],lookupQuerystring:"lang",lookupCookie:"lang"},fallbackLng:"ru",preload:["ru"]});const i=n.handle(o);e.exports=i},163:(e,r,t)=>{t(142).config();const{RateLimiterMemory:o}=t(298),s=t(924),n=process.env.LOGIN_LIMIT_ATTEMPTS||5,a=process.env.LOGIN_DAY_LIMIT_ATTEMPTS||50,i=process.env.API_LIMIT_ATTEMPTS||250,c=process.env.LOGIN_DURATION_MS||180,u=process.env.LOGIN_DAY_DURATION_HR||24,l=(process.env.API_DURATION_MS,process.env.LOGIN_BLOCK_MS||180),p=process.env.LOGIN_DAY_BLOCK_HR||24,d=(new o({points:n,duration:c,blockDuration:l}),new o({points:a,duration:3600*u,blockDuration:3600*p}),new o({points:100,duration:100,inmemoryBlockDuration:1}));e.exports=(e,r,t)=>{const o=e.body&&e.body.login?e.body.login:e.ip;console.log("req.ip,",e.ip),console.log({maxWrongAttemptsAPI:i,key:o,rateLimiterAPI:d}),console.log(d._memoryStorage),d.consume(o,i).then((e=>{console.log("response",e),t()})).catch((e=>(console.log(e),s(r,!1,"Вы отправили слишком много запросов. Пожалуйста, подождите немного, а затем повторите попытку!",!0,429))))}},924:e=>{e.exports=(e,r=!1,t="OK",o=!1,s=200)=>e.status(s).json({data:r,message:t,error:o})},490:(e,r,t)=>{const o=t(113);function s(e){return o.createHash("md5").update(e).digest("hex")}e.exports={format:function(){for(var e=arguments[1].length,r=arguments[0],t=0;t<e;t++){var o="\\{"+t+"\\}",s=new RegExp(o,"g");r=r.replace(s,arguments[1][t])}return r},md5:e=>s(e),generatePassword:()=>function(){for(var e="abcdefghijkmnpqrstuvxyzABCDEFGHJKLMNPQRSTUVXYZ23456789",r="",t=0,o=e.length;t<5;++t)r+=e.charAt(Math.floor(Math.random()*o));return{crypto:s(r),password:r}}()}},219:(e,r,t)=>{const{Validator:o}=t(832);e.exports=(e,r)=>(new o).validate(e,r).valid},765:e=>{e.exports={loginSchema:{type:"object",properties:{login:{type:"string",required:!0},password:{type:"string",required:!0}}}}},647:e=>{e.exports={kafedraSchema:{type:"object",properties:{year:{type:"number",required:!0}}}}},192:e=>{e.exports={listSchema:{type:"object",properties:{year:{type:"number",required:!0},rate:{type:"number",required:!0},kafedra:{type:"number",required:!0}}},detailSchema:{type:"object",properties:{rate:{type:"number",required:!0},id_typeUmk:{type:"number",required:!0},id_discipline:{type:"number",required:!0},id_teacher:{type:"number",required:!0}}},downloadSchema:{type:"object",properties:{file:{type:"string",required:!0}}}}},102:(e,r,t)=>{const{sql:o,poolPromise:s}=t(193);e.exports={kafedraListByUserDB:async function({id_avn_user:e}){try{const r=`EXEC SP_RS_LMS_umk_userKafedra @id_AVN_user=${e}`,t=await s();return{data:(await t.query(r)).recordset,error:!1}}catch(e){return console.error(e),{data:!1,error:e.message}}}}},995:(e,r,t)=>{const{sql:o,poolPromise:s}=t(193);e.exports={listDB:async function({year:e,kafedra:r,rate:t}){try{const o=`EXEC SP_RS_LMS_umk_kafedra_exist @year=${e}, @kafedra=${r},  @id_rate=${t}`,n=await s();return{data:(await n.query(o)).recordset,error:!1}}catch(e){return console.error(e),{data:!1,error:e.message}}},detailDB:async function({rate:e,id_typeUmk:r,id_discipline:t,id_teacher:o}){try{const n=`EXEC SP_RS_LMS_umk_kafedra_exist_detail \n                                @id_rate=${e} , \n                                @id_typeUmk=${r}, \n                                @id_discipline=${t}, \n                                @id_teacher=${o}`,a=await s();return{data:(await a.query(n)).recordset,error:!1}}catch(e){return console.error(e),{data:!1,error:e.message}}}}},455:e=>{"use strict";e.exports=require("compression")},710:e=>{"use strict";e.exports=require("cookie-parser")},582:e=>{"use strict";e.exports=require("cors")},974:e=>{"use strict";e.exports=require("debug")},142:e=>{"use strict";e.exports=require("dotenv")},860:e=>{"use strict";e.exports=require("express")},806:e=>{"use strict";e.exports=require("helmet")},805:e=>{"use strict";e.exports=require("i18next")},379:e=>{"use strict";e.exports=require("i18next-http-middleware")},763:e=>{"use strict";e.exports=require("i18next-node-fs-backend")},832:e=>{"use strict";e.exports=require("jsonschema")},470:e=>{"use strict";e.exports=require("morgan")},424:e=>{"use strict";e.exports=require("mssql")},423:e=>{"use strict";e.exports=require("path")},900:e=>{"use strict";e.exports=require("pg")},298:e=>{"use strict";e.exports=require("rate-limiter-flexible")},828:e=>{"use strict";e.exports=require("uuid")},113:e=>{"use strict";e.exports=require("crypto")},147:e=>{"use strict";e.exports=require("fs")},685:e=>{"use strict";e.exports=require("http")},264:e=>{"use strict";e.exports=JSON.parse('{"auth":{"inValidFormat":"Invalid format","welcome":"Welcome!","inValidAuth":"Incorrect username or password","failLoginError":"Failed to log in error,  {{error}}","failLogoutError":"Failed tp log out error, {{error}}","loggedOut":"You are logged out","inputAuth":"Please input username and password"},"token":{"noAuth":"No authorization"},"errorQuery":"Incorrect query, {{error}}","inValidFormat":"Invalid format","selector":{"yearDefaultOK":"Default year is OK","yearListOK":"Year list is OK","kafedraListOK":"Department list is OK"},"umk":{"umkListOK":"UMK report list","umkDetailOK":"UMK report detail","umkDownloadError":"Failed to download UMK, File not found"}}')},845:e=>{"use strict";e.exports=JSON.parse('{"auth":{"inValidFormat":"Туура эмес формат","welcome":"Кош келиңиз!","inValidAuth":"Туура эмес логин же сырсөз","failLoginError":"Кирүүдо туура эмес, {{error}}","failLogoutError":"Чыгууда туура эмес, {{error}}","loggedOut":"Сиз системадан ийгиликтүү чыктыңыз","inputAuth":"Логин жана сырсөздү жазыңыз!"},"token":{"noAuth":"Сиздин авторизация жок"},"errorQuery":"Туура эмес, {{error}}","inValidFormat":"Туура эмес формат","selector":{"yearDefaultOK":"Азыркы жыл","yearListOK":"Жылдар","kafedraListOK":"Кафедралар"},"umk":{"umkListOK":"УМК отчету","umkDetailOK":"Дисциплина боюнча УМКлар","umkDownloadError":"УМК жүктөө туура эмес, файл табылган жок"}}')},234:e=>{"use strict";e.exports=JSON.parse('{"auth":{"inValidFormat":"Неверный формат данных","welcome":"Добро пожаловать!","inValidAuth":"Неверный логин или пароль!","failLoginError":"Не удалось войти, {{error}}","failLogoutError":"Не удалось выйти, {{error}}","loggedOut":"Вы вышли!","inputAuth":"Введите логин и пароль!"},"token":{"noAuth":"Не авторизован!"},"inValidFormat":"Неверный формат данных","errorQuery":"Неправильный запрос, {{error}}","selector":{"yearDefaultOK":"Текущий год","yearListOK":"Список годов","kafedraListOK":"Список кафедр"},"umk":{"umkListOK":"Список отчетов по УМК","umkDetailOK":"Список УМК по дисциплине преподавателя","umkDownloadError":"Ошибка файл не найден"}}')}},r={};function t(o){var s=r[o];if(void 0!==s)return s.exports;var n=r[o]={exports:{}};return e[o](n,n.exports,t),n.exports}(()=>{t(142).config();var e=t(389),r=t(974)("avnUMK:server"),o=t(685),s=function(e){var r=parseInt(e,10);return isNaN(r)?e:r>=0&&r}(process.env.PORT||"3000");e.set("port",s);var n=o.createServer(e);n.listen(s),n.on("error",(function(e){if("listen"!==e.syscall)throw e;var r="string"==typeof s?"Pipe "+s:"Port "+s;switch(e.code){case"EACCES":console.error(r+" requires elevated privileges"),process.exit(1);break;case"EADDRINUSE":console.error(r+" is already in use"),process.exit(1);break;default:throw e}})),n.on("listening",(function(){var e=n.address(),t="string"==typeof e?"pipe "+e:"port "+e.port;r("Listening on "+t)}))})(),app={}})();