const Sequelize = require('sequelize');

// CONNECT TO DATABASE
module.exports = new Sequelize('SDC_earnings', 'root', null, {
  dialect: 'mysql',
  host: 'localhost',
  dialectOptions: {
    supportBigNumbers: true
  }
});