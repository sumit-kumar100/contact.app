const fs = require('fs');
const path = require('path');
const { getFilePaths } = require('../../api/services/generic.service');

/**
 * @function getSwaggerSchemas
 * @description Parse from JSON files in the 'schemas' folder and return all the Swagger Schemas.
 */
const getSwaggerSchemas = () => {
  let schemas = {};
  
  try {
    const filePaths = getFilePaths(__dirname);

    filePaths.forEach((filePath) => {
      const splitFileName = path.basename(filePath).split('.');

      if (
        splitFileName[1] == 'schema' &&
        splitFileName[2] == 'json'
      ) {
        const routeDoc = JSON.parse(
          fs.readFileSync(filePath, 'utf8')
        );
  
        if (routeDoc) {
          for (const key in routeDoc) {
            if (Object.hasOwnProperty.call(routeDoc, key)) {
              const element = routeDoc[key];
              schemas[key] = element;
            }
          }
        }
      }
    });

  } catch(error) {
    console.error(error);
  
  } finally {
    return schemas;
  }
}

module.exports = getSwaggerSchemas();
