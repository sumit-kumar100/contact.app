const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');
const routes = require('../../docs/routes');
const schemas = require('../../docs/schemas');

module.exports = () => {
  const servers = JSON.parse(
    fs.readFileSync(path.join(__dirname, '/../../docs/servers.json'), 'utf8'),
  ).servers;

  const basicInfo = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '/../../docs/basic-info.json'),
      'utf8',
    ),
  ).basicInfo;

  const tags = JSON.parse(
    fs.readFileSync(path.join(__dirname + '/../../docs/tags.json'), 'utf8'),
  ).tags;

  const securitySchemes = JSON.parse(
    fs.readFileSync(
      path.join(__dirname + '/../../docs/security-schemes.json'),
      'utf8',
    ),
  ).securitySchemes;

  const doc = {
    definition: {
      openapi: '3.0.0',
      info: basicInfo,
      servers: servers,
      tags: tags,
      paths: routes,
      components: {
        schemas: schemas,
        /* securitySchemes: securitySchemes */
      },
    },
    apis: [],
  };

  return swaggerJSDoc(doc);
};
