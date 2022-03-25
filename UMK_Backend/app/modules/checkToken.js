const COOKIE = require("../cookies.js");
const send = require("./send.js");
require("dotenv").config();

async function checkToken(req, res, next) {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.FAKE_MODE === "true"
  ) {
    // development FAKE_ID
    next();
  } else {
    const IsAuthenticated = await COOKIE.CHECK_PERM(req, res);
    if (IsAuthenticated) {
      next();
    } else {
        return send(res, false, req.t("token.noAuth"), true, 401);
    }
  }
}

module.exports = checkToken;
