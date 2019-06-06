# The-Very-Merry-Men (TVMM)

> Stock tracker and purchase portal

## Related Projects

  - https://github.com/the-very-merry-men/matthewjdiaz-trade-panel-server
  - https://github.com/the-very-merry-men/SDC-PricePaidChart
  - https://github.com/the-very-merry-men/stock-chart-jeff
  - https://github.com/the-very-merry-men/earnings-graph-graham

## Table of Contents

1. [Usage](#Usage)
1. [CRUD](#CRUD)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Clone to local repo, run npm initialize to initialize my database schema, run npm seed to seed database, run npm start to start server, open browser to localhost:3003... Make sure database -u and -p match in seed script and that database names don't conflict or if using one db that the table names don't.

## CRUD

#### Stocks table

| method | endpoint | input | output | description |
|--------|----------|-------------|
| GET | /stocks/:ticker | ticker string | object for given stock | retrieves stock |
| POST | /stocks/:ticker | ticker string and stock data object | stock objected added to table | posts new stock to table |
| PUT | /stocks/:ticker | ticker string and data to updates | updated stock object | updates stock data object |
| DELETE | /stocks/:ticker | ticker string | deleted object | deletes given stock from db | 

#### Earnings Table
| method | endpoint | input | output | description |
|--------|----------|-------------|
| GET | /stocks/:ticker/earnings | ticker string | earnings object for given stock | retrieves the earnings data for given stock |
| POST | /stocks/:ticker/earnings | ticker string and earnings object | earnings object added to db | posts earnings data to table |
| PUT | /stocks/:ticker/earnings?quarter&year | ticker string and quarter and year query and data to update | updated earnings for that quarter and year | updates earnings data for given quarter and year |
| DELETE | /stocks/:ticker/earnings?quarter&year | ticker string and quarter and year string | deleted object | deletes earnings data for given quarter and year | 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
# steam_recentNews
