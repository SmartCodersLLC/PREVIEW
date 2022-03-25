const { sql, poolPromise } = require("../DB.js");
const COOKIE = require("../cookies.js");
const send = require("../modules/send");
const validate = require("../modules/validator");
const { Validator } = require("jsonschema");
const { listSchema } = require("../schemas/UMKSchema");

class UMKController {
  // список умк по дисциплинам
  async list(req, res) {
    try {
      const isValid = validate(req.body, listSchema);
      if (!isValid) {
        return send(res, false, req.t("inValidFormat"), true, 400);
      }
      const { year, kafedra } = req.body;
      const queryText = `EXEC SP_RS_LMS_umk_kafedra_exist @year=${year}, @kafedra=${kafedra}`;

      const pool = await poolPromise();
      let r = await pool.query(queryText);
      let data = r.recordset;
      return send(res, data, req.t("selector.kafedraListOK"));
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
