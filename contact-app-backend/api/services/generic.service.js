const fs = require('fs');
const path = require('path');
const db = require('../models');
const { StatusCodes } = require('http-status-codes');
const { APIError } = require('../error');

/**
 * @function genericFunctionReturn
 * @description Generic function return format
 * @param {*} data Data (should be null if error is present)
 * @param {*} error Error (should be null if data is present)
 * @returns {{ data: any, error: any }} Generic function return
 */
const genericFunctionReturn = (data, error) => {
  let returnObj = { data: null, error: null };

  try {
    returnObj.data = data;
    returnObj.error = error;
  } catch (error) {
    console.error(error);
  } finally {
    return returnObj;
  }
};

/**
 * @function getFilePaths
 * @description Get the paths of all files present inside directory / sub-directories.
 * @param {string} dirPath Path of directory to iterate
 * @returns {string[]} Array of file paths
 */
const getFilePaths = dirPath => {
  let filePaths = [];

  try {
    /**
     * @function iterateDirectory
     * @description To iterate directory and sub-directories to get file paths.
     * @param {string} dirPath Directory path
     */
    const iterateDirectory = dirPath => {
      fs.readdirSync(dirPath).forEach(file => {
        const currentPath = path.join(dirPath, file);

        if (fs.lstatSync(currentPath).isDirectory()) {
          iterateDirectory(currentPath);
        } else if (fs.lstatSync(currentPath).isFile()) {
          filePaths.push(currentPath);
        }
      });
    };

    iterateDirectory(dirPath);
  } catch (error) {
    console.error(error);
  } finally {
    return filePaths;
  }
};

/**
 * @function genericCreateOne
 * @description To create a data row in a DB table.
 * @param {string} modelName Model name.
 * @param {*} data Input data.
 * @param {Object} options Options.
 * @returns {{ data: any, error: any }} Data or Error.
 */
const genericCreateOne = async (modelName, data, options = {}) => {
  try {
    const result = await db[modelName].create({ ...data }, options);

    if (result instanceof Error) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    return genericFunctionReturn(result, null);
  } catch (error) {
    console.log(error);
    return genericFunctionReturn(
      null,
      new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
    );
  }
};

/**
 * @function genericCreateMultiple
 * @description To create multiple data row(s) in a DB table.
 * @param {string} modelName Model name.
 * @param {*} data Input data.
 * @param {Object} options Options.
 * @returns {{ data: any, error: any }} Data or Error.
 */
const genericCreateMultiple = async (modelName, data, options = {}) => {
  try {
    const result = await db[modelName].bulkCreate([...data], {
      returning: true,
      ...options,
    });

    if (result instanceof Error) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    return genericFunctionReturn(result, null);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
    );
  }
};

/**
 * @function genericGetOne
 * @description To get an data row from a DB table.
 * @param {string} modelName Model name.
 * @param {Object} options Options.
 * @returns {{ data: any, error: any }} Data or Error.
 */
const genericGetOne = async (modelName, options) => {
  try {
    if (options == undefined || options == null || options == {}) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    const result = await db[modelName].findOne(options);

    if (result instanceof Error) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    return genericFunctionReturn(result, null);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
    );
  }
};

/**
 * @function genericGetById
 * @description To get an data row by ID from a DB table.
 * @param {string} modelName Model name.
 * @param {*} id ID.
 * @param {Object} options Options.
 * @returns {{ data: any, error: any }} Data or Error.
 */
const genericGetById = async (modelName, id, options) => {
  try {
    if (!id) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    const result = await db[modelName].findByPk(id, options);

    if (result instanceof Error) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    return genericFunctionReturn(result, null);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
    );
  }
};

/**
 * @function genericGetAll
 * @description To get all data row(s) from a DB table.
 * @param {string} modelName Model name.
 * @param {Object} options Options.
 * @returns {{ data: any, error: any }} Data or Error.
 */
const genericGetAll = async (modelName, options) => {
  try {
    if (options == undefined || options == null || options == {}) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    const result = await db[modelName].findAll({
      ...options,
    });

    if (result instanceof Error) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    return genericFunctionReturn(result, null);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
    );
  }
};

/**
 * @function genericGetAndCountAll
 * @description To get all data row(s) from a DB table and its count.
 * @param {string} modelName Model name.
 * @param {Object} options Options.
 * @returns {{ data: any, error: any }} Data or Error.
 */
const genericGetAndCountAll = async (modelName, options) => {
  try {
    if (options == undefined || options == null || options == {}) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    const result = await db[modelName].findAndCountAll(options);

    if (result instanceof Error) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    return genericFunctionReturn(result, null);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
    );
  }
};

/**
 * @function genericUpdate
 * @description To update data row(s) of a DB table.
 * @param {string} modelName Model name.
 * @param {*} data Input data.
 * @param {Object} options Options.
 * @returns {{ data: any, error: any }} Data or Error.
 */
const genericUpdate = async (modelName, data, options = {}) => {
  try {
    const result = await db[modelName].update(
      { ...data },
      {
        ...options,
        returning: true,
      },
    );

    if (result instanceof Error) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    return genericFunctionReturn(result, null);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
    );
  }
};

/**
 * @function genericDeleteAll
 * @description To delete data row(s) from a DB table.
 * @param {string} modelName Model name.
 * @param {Object} options Options.
 * @returns {{ data: any, error: any }} Data or Error.
 */
const genericDeleteAll = async (modelName, options) => {
  try {
    if (options == undefined || options == null || options == {}) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    const result = await db[modelName].destroy(options);

    if (result instanceof Error) {
      return genericFunctionReturn(
        null,
        new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
      );
    }

    return genericFunctionReturn(result, null);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR),
    );
  }
};

module.exports = {
  genericFunctionReturn,
  getFilePaths,
  genericCreateOne,
  genericCreateMultiple,

  genericGetById,
  genericGetOne,
  genericGetAll,
  genericGetAndCountAll,

  genericUpdate,

  genericDeleteAll,
};
