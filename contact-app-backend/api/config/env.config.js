require('dotenv').config();

const envVarNames = {
  string: [
    'NODE_ENV',
    'API_HOST',
    'API_VERSION',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_HOST',
  ],

  int: ['API_PORT', 'POSTGRES_PORT', 'PAGINATION_LIMIT'],

  array: [],
};

let env = {};

Object.keys(envVarNames).forEach(type => {
  if (type == 'string') {
    envVarNames[type].forEach(elem => {
      env[elem] = process.env[elem];
    });
  } else if (type == 'int') {
    envVarNames[type].forEach(elem => {
      env[elem] = parseInt(process.env[elem]);
    });
  } else if (type == 'array') {
    envVarNames[type].forEach(elem => {
      env[elem] = process.env[elem].split(',');
    });
  }
});

module.exports = env;
