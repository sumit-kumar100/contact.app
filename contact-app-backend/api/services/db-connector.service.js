const waitPort = require('wait-port');
const { Client } = require('pg');
const dbConfig = require(__dirname + '/../config/db.config.js');

async function connectToPgSQL() {
  try {
    await waitPort({
      host: dbConfig.host,
      port: dbConfig.port,
    });

    const pgSqlConn = new Client({
      host: dbConfig.host,
      user: dbConfig.username,
      port: dbConfig.port,
      password: dbConfig.password,
    });

    await pgSqlConn.connect();
    await pgSqlConn.end();

    return pgSqlConn;
  } catch (error) {
    console.error(error);
  }
}

async function dbInit() {
  return connectToPgSQL();
}

async function dbTearDown(dbConn) {
  return dbConn?.end();
}

module.exports = {
  dbInit,
  dbTearDown,
};
