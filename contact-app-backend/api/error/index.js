/**
 * Error Class For APi's
 * @module APIError
 */

class APIError extends Error {
  /**
   * @param {string} ERROR_CODE
   * @param {string} STATUS
   * @param {string} MESSAGE
   */

  constructor(ERROR_CODE, STATUS, MESSAGE = undefined) {
    super();

    this.code = ERROR_CODE;
    this.status = STATUS;
    this.message = MESSAGE;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  APIError: APIError,
};
