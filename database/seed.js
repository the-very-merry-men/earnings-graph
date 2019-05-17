const Sequelize = require('sequelize');
const request = require('request');
const key = require('../config/api_key.js');

// CONNECT TO DATABASE
var connection = new Sequelize('front_end', 'root', 'Umairnadeem_1', {
    dialect: 'mysql', dialectOptions: {
        supportBigNumbers: true
    }
});

// INITIALIZE TABLES
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

// BEGIN SEEDING DATA
connection.sync({ force: true }).then(() => {
    var symbols;
    var industry = 'Technology'; /* Change this to preference */

    // Fetch latest stock financials from IEX API
    request({
        url: `https://cloud.iexapis.com/v1/stock/market/collection/sector?collectionName=${industry}&token=${key}`,
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

        // Fetch latest company information from IEX API
        request({
            url: `https://cloud.iexapis.com/v1/stock/market/batch?types=company&symbols=${symbols}&token=${key}`,
            headers: {
                'Content-Type': 'text/event-stream'
            }
        }, (req, res, body) => {
            var data = JSON.parse(body);

            Object.keys(data).slice(0, 100).forEach((ticker, i) => {
                mappedData[i].ceo = data[ticker].company.CEO;
                mappedData[i].employees = data[ticker].company.employees || Math.random() * 500000;
                mappedData[i].about = data[ticker].company.description;
            });
            // Populate the stocks table
            Stocks.bulkCreate(mappedData);
        });

        // Generate dummy data for the EPS table
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
        // Populate the eps_ratio table
        EpsRatio.bulkCreate(epsData);
    });
});

module.exports = {
    connection
};