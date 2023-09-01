const { Request, Response, NextFunction } = require('express');
const { StatusCodes } = require('http-status-codes');
const logger = require('./../services/logger.service');

/**
 * @function customErrorHandler
 * @description Custom Error Handler
 * @param {Error} error Error object
 * @param {Request} req Incoming Request
 * @param {Response} res Response object
 * @param {NextFunction} next Next Function
 */
const customErrorHandler = (error, req, res, next) => {
  if (error instanceof Error && !res.headersSent) {
    sendError(error, res);
  }
};

/**
 * @function sendError
 * @description To send error response
 * @param {Error} err Error object
 * @param {Response} res Response
 */
const sendError = (err, res) => {
  err.status = err.status ? err.status : StatusCodes.INTERNAL_SERVER_ERROR;

  err.code = err.code ? err.code : '0000';

  err.message = err.message
    ? err.message
    : errorMessages[err.code]
    ? errorMessages[err.code].message
    : 'Something went wrong';

  logger.error(`ERROR: ${err.message}`);

  if (process.env.NODE_ENV === 'production') {
    sendProdError(err, res);
  } else {
    sendDevError(err, res);
  }
};

/**
 * @function sendDevError
 * @description To send 'development' environment error response
 * @param {Error} err Error object
 * @param {Response} res Response
 */
const sendDevError = (err, res) => {
  res.status(err.status).json({
    data: null,
    error: {
      code: err.code,
      message: err.message,
      stack: err.stack,
    },
  });
};

/**
 * @function sendProdError
 * @description To send 'production' environment error response
 * @param {Error} err Error object
 * @param {Response} res Response
 */
const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.status).json({
      data: null,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  } else {
    logger.error(`ERROR: ${err.message}`);
    res.status(err.status).json({
      data: null,
      error: {
        message: err.message,
      },
    });
  }
};

module.exports = customErrorHandler;
