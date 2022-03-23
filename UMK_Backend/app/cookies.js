require("dotenv").config();

const DB_TYPE = process.env.DBTYPE;

if (DB_TYPE === "MS") {
  const {
    LOGIN,
    LOGOUT,
    CHECK_PERM,
    GET_USER,
    COOKIE_NAME,
  } = require("./modules/cookie_MS");

  module.exports = {
    LOGIN,
    LOGOUT,
    CHECK_PERM,
    GET_USER,
    COOKIE_NAME,
  };
}
if (DB_TYPE === "PG") {
  const {
    LOGIN,
    LOGOUT,
    CHECK_PERM,
    GET_USER,
    COOKIE_NAME,
  } = require("./modules/DB_PG");
  module.exports = {
    LOGIN,
    LOGOUT,
    CHECK_PERM,
    GET_USER,
    COOKIE_NAME,
  };
}
