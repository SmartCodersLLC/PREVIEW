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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(translator);

if (process.env.NODE_ENV === "production") {
  console.debug("production ВСЕ OK");
  app.use(helmet());
} else {
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

app.use(`/${appUrl}/public`, express.static(path.join(__dirname, "public")));

app.all("/", async function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("hello", req.i18n.t("hello"))
  // console.log("hello", req.t, req.i18n)

  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(`/${appUrl}/api/${appVersion}`, indexRouter);
// app.use(`/${appUrl}/api/${appVersion}`, limiter, indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.sendFile(path.join(__dirname, "public", "404.html"));
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
