const faker = require('faker');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const fs = require('fs');

const populateStocksTable = () => {
  writer.pipe(fs.createWriteStream('seedstocks.csv'));
  for (let i = 1; i <= 10000000; i++) {
    const companyName = faker.company.companyName().split(' ').join('-');
    const stock_ticker = faker.Lorem.characters(4).toUpperCase();
    const lastEPSDate = faker.Date.backward(85);
    const lastEPS = faker.Commerce.price(range = 0..6.0); 
    writer.write({i, companyName, stock_ticker, lastEPS, lastEPSDate});
  }
  console.log('done');
};

const populateEarningsTable = () => {
  writer.pipe(fs.createWriteStream('seedearnings.csv'));
  for (var i = 1; i < 80000000; i++) {
	const stock_id = i <= 10000000 ? i : i - (Math.floor(i / 10000001) * 10000000);
    const estimated_eps = faker.Commerce.price(range = 0..6.0); 
    const reported_earnings = faker.Number.between(100000000, 900000000);
    const outstanding_shares = faker.Number.between(100000000, 900000000);
    const year = i <= 40000000 ? 2017 : 2018;
    const quarter = i <= 10000000 ? 1 : Math.ceil(i / 10000000) - (Math.floor(i / 40000001) * 4);
  }
}

const populateOutstandingSharesTable = () => {
  writer.pipe(fs.createWriteStream('seedoutstandingshares.csv'));
  for (var i = 1; i < 80000000; i++) {
  	const stock_id = i <= 10000000 ? i : i - (Math.floor(i / 10000001) * 10000000);
  	const outstanding_shares = faker.Number.between(100000000, 900000000);
  	reported_date = faker.Date.between((Math.floor(i / 10000000)).days.ago);
  }
}

populateStocksTable();
// populateEarningsTable();
// populateOutstandingSharesTable();