require('dotenv').config(); // Pastikan dotenv di-load di awal

module.exports = {
  development: {
    database: process.env.DB_NAME,
    dialect: process.env.DB_CONNECTION,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    replication: {
      read: [
        {
          host: process.env.DB_READ_HOST,
          username: process.env.DB_READ_USERNAME,
          password: process.env.DB_READ_PASSWORD,
          port: process.env.DB_READ_PORT,
        },
      ],
      write: {
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      },
    },
    logging: console.log,
  },
  test: {
    database: process.env.DB_NAME,
    dialect: process.env.DB_CONNECTION,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: console.log,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  },
};
