const faker = require('faker');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const fs = require('fs');

const populateStocksTable = () => {
  writer.pipe(fs.createWriteStream('seedstocks.csv'));
  for (let i = 1; i <= 10000000; i++) {
    const companyName = faker.company.companyName().split(' ').join('-');
    const stock_ticker = faker.lorem.word().toUpperCase().slice(0, 4);
    const lastEPSDate = faker.date.recent(85);
    const lastEPS = faker.finance.amount(-.22, 6.0, 2); 
    writer.write({i, companyName, stock_ticker, lastEPS, lastEPSDate});
  }

  writer.end();
  console.log('done');
};

const populateEarningsTable = () => {
  writer.pipe(fs.createWriteStream('seedearnings.csv'));
  var i = 1;
  write();

  function write() {

  	var drained = true;
  	do {
  		i++;
  		const stock_id = i <= 10000000 ? i : i - (Math.floor(i / 10000001) * 10000000);
	    const lastEPS = faker.finance.amount(-.22, 6.0, 2); 
	    const reported_earnings = faker.random.number({ min: 100000000, max: 900000000});
	    const outstanding_shares = faker.random.number({ min: 100000000, max: 900000000});
	    const year = i <= 40000000 ? 2017 : 2018;
	    const quarter = i <= 10000000 ? 1 : Math.ceil(i / 10000000) - (Math.floor(i / 40000001) * 4);
	    drained = writer.write({stock_id, lastEPS, reported_earnings, outstanding_shares, year, quarter});
  	} while (i < 80000000 && drained);
  	if (i < 80000000) {
  		//paused for draining

  		writer.once('drain', write);
  	}
  }

  // writer.end();
  console.log('finished earnings table generation!');
}

const populateOutstandingSharesTable = () => {
  writer.pipe(fs.createWriteStream('seedoutstandingshares.csv'));
  
  // for (var i = 1; i < 80000000; i++) {
  // 	const stock_id = i <= 10000000 ? i : i - (Math.floor(i / 10000001) * 10000000);
  // 	const outstanding_shares = faker.random.number({ min: 100000000, max: 900000000});
  // 	reported_date = faker.date.recent(Math.floor(i / 10000000));
  // 	writer.write({stock_id, outstanding_shares, reported_date});
  // }

  var k = 1;
  Write();

  function Write() {
  	drainNotNeeded = true;
  	do {
	  	k++
	  	const stock_id = k <= 10000000 ? k : k - (Math.floor(k / 10000001) * 10000000);
	  	const outstanding_shares = faker.random.number({ min: 100000000, max: 900000000});
	  	reported_date = faker.date.recent(Math.floor(k / 10000000));
	  	drainNotNeeded = writer.write({stock_id, outstanding_shares, reported_date});
  	} while (k < 80000000 && drainNotNeeded);
  	if (k < 80000000) {
  		// write stream disrupted to drain
  		console.log('buffer full! waiting to drain, k:', k);
  		writer.once('drain', Write);
  	}
  }

  // writer.end();
  console.log('finished outstanding_shares generation!');
}

// populateStocksTable();
populateEarningsTable();
// populateOutstandingSharesTable();