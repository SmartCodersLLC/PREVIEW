const express = require("express");
const compression = require("compression");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const send = require("./app/modules/send");
const limiter = require("./app/modules/limiter");
const translator = require("./app/modules/i18n");
const indexRouter = require("./app/index");
const appUrl = process.env.APP_URL;
const appVersion = process.env.API_VERSION;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(translator);

if (process.env.NODE_ENV === "production") {
  console.debug("production ВСЕ OK");
  // app.use(helmet.dnsPrefetchControl());
  // app.use(helmet.expectCt());
  // app.use(helmet.frameguard());
  // app.use(helmet.hidePoweredBy());
  // app.use(helmet.hsts());
  // app.use(helmet.ieNoOpen());
  // app.use(helmet.noSniff());
  // app.use(helmet.originAgentCluster());
  // app.use(helmet.permittedCrossDomainPolicies());
  // app.use(helmet.referrerPolicy());
  // app.use(helmet.xssFilter());
  app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://avn.ksla.kg");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
  app.use(logger("tiny"));
} else {
  app.use(logger("dev"));
  console.debug(
    "РЕЖИМ РАЗРАБОТКИ development ИЗМЕНИТЕ NODE_ENV В .env ФАЙЛЕ на production"
  );
  app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
}

app.use(`/public`, express.static(path.join(__dirname, "public")));
app.use(`/${appUrl}/public`, express.static(path.join(__dirname, "public")));

app.all("/", async function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(`/api/${appVersion}`,  indexRouter);
app.use(`/${appUrl}/api/${appVersion}`,  indexRouter);
// app.use(`/api/${appVersion}`, limiter, indexRouter);
// app.use(`/${appUrl}/api/${appVersion}`, limiter, indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
  // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err.message);
  // render the error page
  return send(res, false, err.message, true, err.status || 500);
});

module.exports = app;
