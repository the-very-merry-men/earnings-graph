const connection = require('../database');
const models = require('../models');

const getEarnings = (ticker, callback) => {
    models.Stocks.findAll({
        attributes: ['id'],
        where: {
            ticker
        }
    }).then(data => models.EpsRatios.findAll({
            where: {
                stock_id: data[0].id
            }
    }))
    .then(data => callback(data))
    .catch(error => callback(error));
}

module.exports = {
    getEarnings
}