const { sql, poolPromise } = require("../DB.js");
const COOKIE = require("../cookies.js");
const send = require("../modules/send");
const validate = require("../modules/validator");
const { listSchema, detailSchema } = require("../schemas/UMKSchema");
const { listDB, detailDB } = require("../services/UMKService");

class UMKController {
  // количесто умк по дисциплинам
  async list(req, res) {
    try {
      const isValid = validate(req.body, listSchema);
      if (!isValid) {
        return send(res, false, req.t("inValidFormat"), true, 400);
      }
      const { data, error } = await listDB(req.body);
      if (error) {
        return send(res, false, req.t("errorQuery", { error }), true, 400);
      }
      return send(res, data, req.t("umk.umkListOK"));
    } catch (err) {
      console.log(err);
      return send(
        res,
        false,
        req.t("errorQuery", { error: err.message }),
        true,
        500
      );
    }
  }
  // список умк по дисциплинам детально
  async detail(req, res) {
    try {
      const isValid = validate(req.body, detailSchema);
      if (!isValid) {
        return send(res, false, req.t("inValidFormat"), true, 400);
      }
      const { data, error } = await detailDB(req.body);
      if (error) {
        return send(res, false, req.t("errorQuery", { error }), true, 400);
      }
      return send(res, data, req.t("umk.umkDetailOK"));
    } catch (err) {
      console.log(err);
      return send(
        res,
        false,
        req.t("errorQuery", { error: err.message }),
        true,
        500
      );
    }
  }
}

module.exports = new UMKController();
