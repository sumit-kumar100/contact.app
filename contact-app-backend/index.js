const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const expressPinoLogger = require('express-pino-logger');
const bodyParser = require('body-parser');
const addAllRoutes = require('./api/routes');
const logger = require('./api/services/logger.service');
const swaggerJSDoc = require('./api/services/swagger.service');
const { dbInit } = require('./api/services/db-connector.service');
const customErrorHandler = require('./api/error/errorHandler');

// Logger middleware
const loggerMidleware = expressPinoLogger({
  logger: logger,
  autoLogging: true,
});

const swaggerFile = swaggerJSDoc();

// Initiate App Dependencies
require('./init')();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMidleware);
app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile, {
  swaggerOptions: {
    defaultModelsExpandDepth: -1
  }
}));

// Routes
addAllRoutes(app);

// Custom Error Handler
app.use(customErrorHandler);

// Listen to the port
app.listen(envConfig.API_PORT, envConfig.API_HOST, async () => {
  console.debug(`Listening on port ${envConfig.API_PORT}.`);
  globalThis['dbConn'] = await dbInit();
  require('./api/models/');
});

const logErrorHandler = async (error) => {
  console.error(error);
  process.exit(1);
}

const terminationHandler = async (error) => {
  console.error(error);
  process.exit(0);
}

process.on('uncaughtException', logErrorHandler);
process.on('unhandledRejection', logErrorHandler);
process.on('SIGTERM', terminationHandler);
process.on('SIGINT', terminationHandler);