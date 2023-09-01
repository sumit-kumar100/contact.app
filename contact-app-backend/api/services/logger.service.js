const pino = require('pino');
const fs = require('fs');
const path = require('path');

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

/* Create api/logs/logger.service.log if it does not exist */
try {
  const logFolderPath = path.join(__dirname, '/../logs');

  if (fs.existsSync(logFolderPath)) {
    if (!fs.existsSync(path.join(logFolderPath, '/logger.service.log'))) {
      fs.writeFileSync(path.join(logFolderPath, '/logger.service.log'), '');
    }
  } else {
    fs.mkdirSync(logFolderPath);
    fs.writeFileSync(path.join(logFolderPath, '/logger.service.log'), '');
  }
} catch (error) {
  console.error(error);
}

module.exports = pino(
  {
    customLevels: levels, // our defined levels
    useOnlyCustomLevels: true,
    level: 'http',
  },
  pino.destination(`${__dirname}/../logs/logger.service.log`),
);
