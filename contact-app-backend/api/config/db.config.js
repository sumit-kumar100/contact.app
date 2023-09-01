const env = require('./env.config');

const dbConfigs = {
  development: {
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: 'contact-app-dev',
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    dialect: 'postgres',
    define: {
      timestamps: true,
      freezeTableName: true,
    },
    logging: false,
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'SequelizeMigrations',
    seederStorageTableName: 'SequelizeSeeds',
  },
  test: {
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: 'contact-app-test',
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    dialect: 'postgres',
    define: {
      timestamps: true,
      freezeTableName: true,
    },
    logging: false,
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'SequelizeMigrations',
    seederStorageTableName: 'SequelizeSeeds',
  },
  production: {
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: 'contact-app-prod',
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    dialect: 'postgres',
    define: {
      timestamps: true,
      freezeTableName: true,
    },
    logging: false,
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'SequelizeMigrations',
    seederStorageTableName: 'SequelizeSeeds',
  },
};

module.exports = dbConfigs[env.NODE_ENV];
