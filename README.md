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

#### Stocks table API

| method | endpoint | input | output | description |
|--------|----------|-------------| ---------- | ---------- |
| GET | /stocks/:ticker | ticker string | data object for given stock | retrieves stock |
| POST | /stocks/:ticker | ticker string and stock data object | stock object added to table | posts new stock to table |
| PUT | /stocks/:ticker | ticker string and data to updates | updated stock object | updates stock data object |
| DELETE | /stocks/:ticker | ticker string | deleted object | deletes given stock from db | 

#### Stocks Schema

| stocks | 
|-----|
| stock_id |
| ticker |
| lastEPS |
| lastEPSDate |

#### Earnings Table API

| method | endpoint | input | output | description |
|--------|----------|-------------| ---------- | --------- |
| GET | /stocks/:stock_id/earnings | stock id number | earnings object for given stock | retrieves the earnings data for given stock |
| GET | /stocks/:stock_id/earnings?period | stock id number and period | earnings for given stock and period, sorted | retrieves x amount of most recent earnings |
| POST | /stocks/:stock_id/earnings | stock id and earnings object | earnings object added to db | posts earnings data to table |
| PUT | /stocks/:stock_id/earnings/:year/:quarter | stock id and quarter and year query and data to update | updated earnings for that quarter and year | updates earnings data for given quarter and year |
| DELETE | /stocks/:ticker/earnings/:year/:quarter | ticker string and quarter and year string | deleted object | deletes earnings data for given quarter and year | 

### Earnings Schema

| Earnings |
|----------|
| stock_id |
| estimated |
| reported_earnings |
| outstanding_shares |
| year |
| quarter |

#### Outstanding Shares History Table API

| method | endpoint | input | output | description |
|--------|----------|-------------| ---------- | --------- |
| GET | /stocks/:stock_id/outstanding/:period | stock_id and period of time | oustanding shares data for given stock and period | gets outstanding shares data for given stock and period of time |
| POST | /stocks/:stock_id/oustanding | stock id and outstanding shares data | data input | adds outstanding shares data for given stock and period |
| PUT | /stocks/:stock_id/outstanding/:date | stock id and data to update for given date | updated data | updates a oustanding share data entry for given period and stock |
| DELETE | /stocks/:stock_id/outstanding/:date | stock id and date of data to delete | deleted data | deletes outstanding shares entry for given date |

#### API Flow

| method | endpoint | input | output | description |
|--------|----------|-------|--------|-------------|
| GET | /stocks/:ticker | ticker string | data object for given stock | retrieves stock_id, lastEPS, and lastEPSDate. If lastEPSDate is more than 1 month old, don't display it, only grab 7 entries next, and estimate next earnings |
| GET | /stocks/:stock_id/earnings | stock id number and max entries returned (7/8) | earnings entries for given stock | retrieves the last 7/8 earnings entries sorted by date |
|     |     |     |     | calculate EPS using reported_earnings and outstanding shares |
| GET | /stocks/:stock_id/outstanding/:period | stock_id and period of time | oustanding shares data for given stock and period | Use last 10 outstanding shares data to calculate estimated future outstanding shares |
|     |     |     |     | calculate estimated EPS using the retrieved earnings data divided by the calculated expected future outstanding shares |
| POST | /stocks/:stock_id/earnings | stock id and earnings object | earnings object added to db | posts estimated earnings entry to table, reported_earnings and outstanding_shares are empty, to be updated when released |
| PUT | /stocks/:stock_id/earnings/:year/:quarter | stock id and quarter and year query and data to update | updated earnings for that quarter and year | (later) updates earnings data for given quarter and year when earnings and outstanding share are officially reported |



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
