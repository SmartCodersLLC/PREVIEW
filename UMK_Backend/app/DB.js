// const PATH = require("path");
// const CONFIG = require(PATH.join(__dirname, "..", "config.js"));
// const sql = require("mssql");
require("dotenv").config();
// console.log(process.env.REQUESTTIMEOUT)
// const CONFIGDB = {
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   server: process.env.SERVER,
//   database: process.env.NAME,
//   stream: !!parseInt(process.env.STREAM),
//   requestTimeout: parseInt(process.env.REQUESTTIMEOUT), // 30000, //ms 30sec
//   options: {
//     encrypt: !!parseInt(process.env.ENCRYPT),
//   },
// };

// const poolPromise = new sql.ConnectionPool(CONFIGDB)
//   .connect()
//   .then((pool) => {
//     console.log("Connected to MSSQL");
//     return pool;
//   })
//   .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

// module.exports = {
//   sql,
//   poolPromise,
// };

const DB_TYPE = process.env.DBTYPE;

if (DB_TYPE === "MS") {
  const {
    sql,
    poolPromise,
    getConnected,
    queryPool,
    connectWithLogin,
    connectWithCookie,
  } = require("./modules/DB_MS");
  module.exports = {
    sql,
    poolPromise,
    getConnected,
    queryPool,
    connectWithLogin,
    connectWithCookie,
  };
}
if (DB_TYPE === "PG") {
  const { query, getConnected } = require("./modules/DB_PG");
  module.exports = {
    sql: () => false,
    poolPromise: () => false,
    getConnected: getConnected,
    queryPool: query,
    connectWithLogin: () => false,
    connectWithCookie: () => false,
  };
}
