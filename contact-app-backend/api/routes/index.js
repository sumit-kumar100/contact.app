const { Express } = require('express');
const path = require('path');
const env = require('../config/env.config');
const { getFilePaths } = require('../services/generic.service');

/**
 * @function addAllRoutes
 * @description To add all routes to the Express app.
 * @param {Express} app
 */
const addAllRoutes = app => {
  try {
    const filePaths = getFilePaths(__dirname);

    filePaths.forEach(filePath => {
      const splitFileName = path.basename(filePath).split('.');

      if (splitFileName[1] == 'route' && splitFileName[2] == 'js') {
        app.use(`/api/${env.API_VERSION}`, require(filePath));
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = addAllRoutes;
