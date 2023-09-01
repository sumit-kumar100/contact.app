'use strict';
// Module imports
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Direct imports
const basename = path.basename(__filename);
const dbConfig = require(__dirname + '/../config/db.config');

let db = {},
  sequelizeConn;

try {
  sequelizeConn = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig,
  );

  sequelizeConn
    .authenticate()
    .then(() => {
      console.debug('DB Connection established...');
    })
    .catch(error => {
      console.error('DB Authentication Error: ', error);
    });

  // Import all *.model.js files
  fs.readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 && file != basename && file.slice(-3) === '.js'
      );
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(
        sequelizeConn,
        Sequelize.DataTypes,
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
      db[modelName]['logger'] = function (log) {
        console.debug('Query:: ' + log);
      };
    }
  });

  // Set auto-sync migrations for Sequelize
  sequelizeConn.sync({ force: false });

  db.sequelize = sequelizeConn;
  db.Sequelize = Sequelize;
} catch (error) {
  console.error(error);
}

module.exports = db;
