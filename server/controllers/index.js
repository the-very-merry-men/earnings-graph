// const pool = require('../database/connection.js');
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'ec2-54-215-191-223.us-west-1.compute.amazonaws.com',
    database: 'sdc',
    password: 'password',
    port: 5432
});

const getEarnings = (ticker, callback) => {
    const id = parseInt(ticker);
    // console.log('id is this:', id);

    pool.query('SELECT * FROM earnings WHERE id = $1', [id], (err, data) => {
        if (err) {
            console.log('fsdfserror getting earnings from db!', err);
            callback(err, data);
        }

        // console.log('[server/controllers/index] got stuff back from db?');
        callback(null, data);
    })
}

const postEarnings = (stock, data, callback) => {

    var postData = [
        stock,
        data.lasteps, 
        data.reported_earnings, 
        data.outstanding_shares, 
        data.year, 
        data.quarter
    ];

    pool.query('INSERT INTO earnings (id, lasteps, reported_earnings, outstanding_shares, year, quarter) VALUES ($1, $2, $3, $4, $5, $6)', postData, (err, data) => {
        if (err) {
            console.log('[server/controllers/index.js:39] error posting to db', err);
            return callback(err, data);
        }

        // console.log('[server/controllers/index.js:43] posted to db!');
        callback(null, data);
    })

}

module.exports = {
    getEarnings: getEarnings,
    postEarnings: postEarnings,
    pool: pool
}