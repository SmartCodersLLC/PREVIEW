const COOKIE = require("../cookies.js");
const { sql, poolPromise } = require("../DB.js");
const send = require("../modules/send");

// controller для работы со справочниками
class SelectorController {
  // get запрос для получения года обучения
  async year(req, res) {
    try {
      const queryText = `
            SELECT     id_a_year, p32
            FROM         a_year
            WHERE     (id_a_year > 11 AND id_a_year < 24)`;
      const pool = await poolPromise();
      const { id_avn_user } = await COOKIE.GET_USER(req);
      let r = await pool.query(queryText);
      let yearList = r.recordset;
      return res.json({
        status: 300,
        message: `yearList OK`,
        result: yearList,
      });
    } catch (err) {
      console.log(err);
      return send(res, false, `Неправильный запрос ${err.message}`, true, 500);
    }
  }

  // get запрос для получения факультетов
  async getFaculty(req, res) {
    try {
      const queryText = `
            SELECT TOP 1000 [id_faculty]
            ,[p23-2] as value
            FROM [AVN].[dbo].[faculty]`;
      const pool = await poolPromise();
      let r = await pool.query(queryText);
      let favulties = r.recordset;
      return res.json({
        status: 300,
        message: `yearList OK`,
        result: favulties,
      });
    } catch (err) {
      console.log(err);
      return res.json({
        status: 1,
        message: `Неправильный запрос ${err.message}`,
        result: false,
      });
    }
  }
}

module.exports = new SelectorController();
