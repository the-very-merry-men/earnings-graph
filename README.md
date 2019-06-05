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

| method | endpoint | description |
|--------|----------|-------------|
| GET | /stocks/:ticker/earnings | retrieves the earnings data for given stock |
| POST | /stocks/:ticker/earnings | posts earnings data to table |
| PUT | /stocks/:ticker/earnings/:quarter | updates earnings data for given quarter and year |
| DELETE | /stocks/:ticker/earnings/:quarter | deletes earnings data for given quarter and year | 

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
