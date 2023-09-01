const fs = require('fs');
const path = require('path');
const { getFilePaths } = require('../../api/services/generic.service');

const getSwaggerRoutes = () => {
  let routes = {};

  try {
    const filePaths = getFilePaths(__dirname);

    filePaths.forEach((filePath) => {
      const splitFileName = path.basename(filePath).split('.');

      if (
        splitFileName[1] == 'route' &&
        splitFileName[2] == 'json'
      ) {
        const routeDoc = JSON.parse(
          fs.readFileSync(filePath, 'utf8')
        );
  
        if (routeDoc) {
          for (const key in routeDoc) {
            if (Object.hasOwnProperty.call(routeDoc, key)) {
              const element = routeDoc[key];
              routes[key] = element;
            }
          }
        }
      }
    });

  } catch(error) {
    console.error(error);
  
  } finally {
    return routes;
  }
}

module.exports = getSwaggerRoutes();
