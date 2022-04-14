const { sql, poolPromise } = require("../DB.js");

async function kafedraListByUserDB({ id_avn_user }) {
  try {
    const queryText = `EXEC SP_RS_LMS_umk_userKafedra @id_AVN_user=${id_avn_user}`;
    const pool = await poolPromise();
    let r = await pool.query(queryText);
    let data = r.recordset;
    return { data, error: false };
  } catch (err) {
    console.error(err);
    return { data: false, error: err.message };
  }
}

module.exports = { kafedraListByUserDB };
