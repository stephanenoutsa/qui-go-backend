const Sequelize = require('sequelize');
const config = require('../config/config');

const c = process.env.production ? config.prod : config.dev;

// Instantiate new Sequelize instance!
const sequelize = new Sequelize({
  username: c.username,
  password: c.password,
  database: c.database,
  host: c.host,
  dialect: c.dialect,
});

module.exports = sequelize;
