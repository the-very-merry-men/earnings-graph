const Sequelize = require('sequelize');

// CONNECT TO DATABASE
module.exports = new Sequelize('mysql://root:example@database:3306/earnings_chart', {
  dialect: 'mysql',
  dialectOptions: {
    supportBigNumbers: true
  }
});