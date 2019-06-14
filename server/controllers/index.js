// const pool = require('../database/connection.js');
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'sdc',
    host: 'localhost',
    database: 'sdc',
    password: 'password',
    port: 5432
});

const getEarnings = (ticker, callback) => {
    const id = parseInt(ticker);

    pool.query('SELECT * FROM earnings WHERE id = $1', [id], (err, data) => {
        if (err) {
            console.log('error getting earnings from db!', err);
            return callback(err);
        }

        console.log('got stuff back from db?', data);
        callback(data);
    })
}

module.exports = {
    getEarnings
}