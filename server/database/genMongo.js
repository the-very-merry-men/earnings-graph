const faker = require('faker');
const fs = require('fs');
const writer = fs.createWriteStream('/d/Documents/hack_reactor/hrsf116_SDC/seedMongo.json');

const createStocksObj = (writer) => {
  var i = 1;
  Write();

  function Write() {
    var drainNotNeeded = true;

    do {
      i++;

      let obj = {
        stock_id: i,
        stock_ticker: faker.lorem.word().toUpperCase().slice(0, 4),
        lastEPSDate: faker.date.recent(85),
        lastEPS: faker.finance.amount(-.22, 6.0, 2),
        earnings: { // using a function here to generate this would be ideal
          2017: {
            q1: {
              reported_earnings: faker.random.number({ min: 100000000, max: 900000000}),
              outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
              year: 2017,
              quarter: 1
            },
            q2: {            
              reported_earnings: faker.random.number({ min: 100000000, max: 900000000}),
              outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
              year: 2017,
              quarter: 2
            },
            q3: {
              reported_earnings: faker.random.number({ min: 100000000, max: 900000000}),
              outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
              year: 2017,
              quarter: 3
            },
            q4: {
              reported_earnings: faker.random.number({ min: 100000000, max: 900000000}),
              outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
              year: 2017,
              quarter: 4
            }
          },
          2018: {
            q1: {
              reported_earnings: faker.random.number({ min: 100000000, max: 900000000}),
              outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
              year: 2018,
              quarter: 1
            },
            q2: {            
              reported_earnings: faker.random.number({ min: 100000000, max: 900000000}),
              outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
              year: 2018,
              quarter: 2
            },
            q3: {
              reported_earnings: faker.random.number({ min: 100000000, max: 900000000}),
              outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
              year: 2018,
              quarter: 3
            },
            q4: {
              reported_earnings: faker.random.number({ min: 100000000, max: 900000000}),
              outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
              year: 2018,
              quarter: 4
            }
          }
        },
        outstanding_shares: [ // I know this looks repetitive... ideally id define a generation function and invoke here
          {
            outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
            reported_date: faker.date.recent(Math.floor(i / 10000000)),
          },
          {
            outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
            reported_date: faker.date.recent(Math.floor(i / 10000000)),
          },
          {
            outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
            reported_date: faker.date.recent(Math.floor(i / 10000000)),
          },
          {
            outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
            reported_date: faker.date.recent(Math.floor(i / 10000000)),
          },
          {
            outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
            reported_date: faker.date.recent(Math.floor(i / 10000000)),
          },
          {
            outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
            reported_date: faker.date.recent(Math.floor(i / 10000000)),
          },
          {
            outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
            reported_date: faker.date.recent(Math.floor(i / 10000000)),
          },
          {
            outstanding_shares: faker.random.number({ min: 100000000, max: 900000000}),
            reported_date: faker.date.recent(Math.floor(i / 10000000)),
          }
        ]
      } //end of obj def
      
      drainNotNeeded = writer.write((JSON.stringify(obj) + '\n'), 'utf8');
    } while (i <= 10000000 && drainNotNeeded);
    if (i <= 10000000) {
      writer.once('drain', Write);
    }
  }
}

createStocksObj(writer);