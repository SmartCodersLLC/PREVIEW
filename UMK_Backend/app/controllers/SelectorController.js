const COOKIE = require("../cookies.js");
const { sql, poolPromise } = require("../DB.js");
const send = require("../modules/send");
const validate = require("../modules/validator");
const { kafedraSchema } = require("../schemas/SelectorSchema");

// controller для работы селекторов
class SelectorController {
  // post запрос для получения текущего года обучения
  async yearDefault(req, res) {
    try {
      const queryText = `SELECT id_a_year as id, p32 AS name FROM V_GetCurrentAcademicIdYear`;
      const pool = await poolPromise();
      let r = await pool.query(queryText);
      let year = r.recordset[0];
      return send(res, year, req.t("selector.yearDefaultOK"));
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

  // post запрос для получения списка годов обучения
  async yearList(req, res) {
    try {
      const queryText = `
        SELECT id_a_year as id, p32 AS name
        FROM a_year
        WHERE (u_god BETWEEN YEAR(GETDATE()) - 4 AND YEAR(GETDATE()) + 1)`;
      const pool = await poolPromise();
      let r = await pool.query(queryText);
      let yearList = r.recordset;
      return send(res, yearList, req.t("selector.yearListOK"));
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

  // post запрос для получения списка кафедр по году обучения
  async kafedraList(req, res) {
    try {
      const isValid = validate(req.body, kafedraSchema);
      if (!isValid) {
        return send(res, false, req.t("inValidFormat"), true, 400);
      }
      const { year } = req.body;
      const queryText = `
      SELECT kafedra.id_kafedra, kafedra.f1 as name
      FROM kafedra INNER JOIN educ_sh ON kafedra.id_kafedra = educ_sh.id_kafedra
      WHERE educ_sh.id_a_year = ${year}
      GROUP BY kafedra.id_kafedra, kafedra.f1
      ORDER BY kafedra.f1`;

      const pool = await poolPromise();
      let r = await pool.query(queryText);
      let yearList = r.recordset;
      return send(res, yearList, req.t("selector.kafedraListOK"));
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

module.exports = new SelectorController();
