
DROP TABLE stocks;
DROP TABLE earnings;
DROP TABLE shares;

CREATE TABLE stocks (
	id INTEGER NOT NULL,
	company_name VARCHAR (255),
	stock_ticker VARCHAR (255),
	lastEPS DECIMAL (4, 2),
	lastEPSDate VARCHAR (255)
);

CREATE TABLE earnings (
	id INTEGER NOT NULL,
	lastEPS DECIMAL (4, 2),
	reported_earnings INTEGER NOT NULL,
	outstanding_shares INTEGER NOT NULL,
	year SMALLINT NOT NULL,
	quarter SMALLINT NOT NULL
);

CREATE TABLE shares (
	id INTEGER NOT NULL,
	outstanding_shares INTEGER NOT NULL,
	reported_date VARCHAR (255)
);

COPY stocks(id, company_name, stock_ticker, lastEPS, lastEPSDate)
FROM '/c/Users/dough/Documents/hack_reactor/hrsf116_SDC/earnings-chart/seedstocks.csv' DELIMITER ',' CSV HEADER;

COPY earnings(id, lastEPS, reported_earnings, outstanding_shares, year, quarter)
FROM '/c/Users/dough/Documents/hack_reactor/hrsf116_SDC/earnings-chart/seedearnings.csv' DELIMITER ',' CSV HEADER;

COPY shares(id, outstanding_shares, reported_date)
FROM '/c/Users/dough/Documents/hack_reactor/hrsf116_SDC/earnings-chart/seedoutstandingshares.csv' DELIMITER ',' CSV HEADER;