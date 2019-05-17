const Sequelize = require('sequelize');
const request = require('request');
const key = require('../config/api_key.js');
var connection = new Sequelize('front_end', 'root', 'Umairnadeem_1', {
    dialect: 'mysql', dialectOptions: {
        supportBigNumbers: true
    }
});

var Stocks = connection.define('stocks', {
    name: Sequelize.STRING,
    ticker: Sequelize.STRING,
    price: {
        type: Sequelize.DECIMAL(10, 2)
    },
    about: Sequelize.TEXT,
    buy_rating: Sequelize.INTEGER,
    rh_owners: Sequelize.INTEGER,
    ceo: Sequelize.STRING,
    market_cap: Sequelize.BIGINT,
    employees: Sequelize.INTEGER,
    pe_ratio: {
        type: Sequelize.DECIMAL(10, 2)
    },
    div_yield: {
        type: Sequelize.DECIMAL(10, 2)
    }
});

var EpsRatio = connection.define('eps_ratio', {
    stock_id: Sequelize.INTEGER,
    year: Sequelize.INTEGER,
    quarter: Sequelize.INTEGER,
    actual_eps: {
        type: Sequelize.DECIMAL(10, 2)
    },
    expected_eps: {
        type: Sequelize.DECIMAL(10, 2)
    }
});

connection.sync({ force: true }).then(() => {
    var symbols;

    request({
        url: `https://cloud.iexapis.com/v1/stock/market/collection/sector?collectionName=Technology&token=${key}`,
        headers: {
            'Content-Type': 'text/event-stream'
        }
    }, (req, res, body) => {
        var data = JSON.parse(body);
        symbols = data.slice(0, 100).map(iex => iex['symbol']).join(',');
        var mappedData = data.slice(0, 100).map(iex => ({
            name: iex['companyName'],
            ticker: iex['symbol'],
            price: iex['latestPrice'] || Math.random() * 100,
            buy_rating: Math.floor(Math.random() * 100),
            rh_owners: Math.floor(Math.random() * 100000),
            market_cap: iex['marketCap'] || Math.random() * 1000000,
            pe_ratio: iex['peRatio'] || -30 + Math.random() * 60,
            div_yield: Math.random() * 100
        }));

        request({
            url: `https://cloud.iexapis.com/v1/stock/market/batch?types=company&symbols=${symbols}&token=${key}`,
            headers: {
                'Content-Type': 'text/event-stream'
            }
        }, (req, res, body) => {
            var data = JSON.parse(body);

            var extractedInfo = Object.keys(data).slice(0, 100).map((ticker, i) => {
                mappedData[i].ceo = data[ticker].company.CEO;
                mappedData[i].employees = data[ticker].company.employees || Math.random() * 500000;
                mappedData[i].about = data[ticker].company.description;
            });
            Stocks.bulkCreate(mappedData);
        });
        const startYear = 2017;
        const endYear = 2018;
        var epsData = [];
        mappedData.forEach((stock, stockId) => {
            var macroSeed = Math.random();
            for (let year = startYear; year <= endYear; year++) {
                for (let quarter = 1; quarter <= 4; quarter++) {
                    epsData.push({
                        stock_id: stockId + 1,
                        year,
                        quarter,
                        actual_eps: (-10 + macroSeed * 20 + Math.random() * 5).toFixed(2),
                        expected_eps: (-10 + macroSeed * 20 + Math.random() * 5).toFixed(2)
                    });
                }
            }
        });
        EpsRatio.bulkCreate(epsData);
    });
});

module.exports = {
    connection
};