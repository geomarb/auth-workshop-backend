const mysql = require("mysql2/promise");

let connection;
let pool;
const dbOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
  namedPlaceHolders: true,
};

const getConnection = async () => {
  if (connection) return connection;
  connection = mysql.creaetConnection(dbOptions);
  return connection;
};

const getPool = async () => {
  if (pool) return pool;
  pool = mysql.createPool(dbOptions);
  return pool;
};

const query = async (...args) => {
  const sql = getConnection.format(...args);
  return getPool().query(sql);
};

exports.close = async () => {
  await connection.end();
  await pool.end();
};

module.exports = { getConnection, getPool, query, close };
