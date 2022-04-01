const { sql, poolPromise } = require("../DB.js");

async function listDB({ year, kafedra, rate }) {
  try {
    const queryText = `EXEC SP_RS_LMS_umk_kafedra_exist @year=${year}, @kafedra=${kafedra},  @id_rate=${rate}`;
    const pool = await poolPromise();
    let r = await pool.query(queryText);
    let data = r.recordset;
    return { data, error: false };
  } catch (err) {
    console.error(err);
    return { data: false, error: err.message };
  }
}

// список умк по дисциплинам детально
async function detailDB({ rate, id_typeUmk, id_discipline, id_teacher }) {
  try {
    const queryText = `EXEC SP_RS_LMS_umk_kafedra_exist_detail 
                                @id_rate=${rate} , 
                                @id_typeUmk=${id_typeUmk}, 
                                @id_discipline=${id_discipline}, 
                                @id_teacher=${id_teacher}`;

    const pool = await poolPromise();
    let r = await pool.query(queryText);
    let data = r.recordset;
    return { data, error: false };
  } catch (err) {
    console.error(err);
    return { data: false, error: err.message };
  }
}

module.exports = { listDB, detailDB };
