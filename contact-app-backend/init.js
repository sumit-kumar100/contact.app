const fs = require("fs");
const db = require("./api/models");
const logger = require("./api/services/logger.service");
const env = require('./api/config/env.config');

module.exports = async () => {
  try {
    console.debug(`Using '${env.NODE_ENV}' environment.`);
    console.debug("Config loaded.");
    
    // Load env variables
    globalThis["envConfig"] = env;

    // Load logger
    globalThis["logger"] = logger;

    // Load DB
    globalThis["db"] = db;

    // Load error messages
    globalThis["errorMessages"] = JSON.parse(fs.readFileSync("./api/error/errors.json", "utf8"));
    
    console.debug("DB loaded.");
    
  } catch(error) {
    console.error(error);
  }
}
