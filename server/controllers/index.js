const connection = require('../database');
const models = require('../models');

const getEarnings = (ticker, callback) => {
    models.Stocks.findAll({}).then(data => callback(data));
}

module.exports = {
    getEarnings
}