const config = require("../config/config.json");

const Sequelize = require("sequelize");

const db = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
});

module.exports = db;
