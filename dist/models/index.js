"use strict";

var _require = require('sequelize'),
  Sequelize = _require.Sequelize;
var config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
var dotenv = require('dotenv');
var path = require('path');
dotenv.config({
  path: path.resolve(__dirname, '../.env')
});
var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false
});
sequelize.sync().then(function () {
  return console.log('Database synced');
})["catch"](function (err) {
  return console.log('Error' + err);
});
module.exports = sequelize;