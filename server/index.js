require('newrelic');

const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const controllers = require('./controllers/index.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/public')));

app.get('/api/stocks/:stock/earnings', (req, res) => {
  
  // TODO: check stocks table to get next eps reporting date and adjust earnings query
  
  // let id = parseInt(req.params.stock);
  // console.log('req.params.stock:', req.params.stock);

  controllers.getEarnings(req.params.stock, (err, data) => {
  	if (err) {
  		console.log('error getting earnings from db!', err);
  		res.status(500);
  		res.send(err);
  	}

  	// console.log('data received from psql!');
  	// console.log('[server/index.js] rows of that received from db:');
  	res.status(200);
    res.send(data.rows);
  });
});

app.post('/api/stocks/:stock/earnings', (req, res) => { //posting new earnings

	// console.log('req body!:', req.body);

	controllers.postEarnings(req.params.stock, req.body, (err, data) => {
		if (err) {
			console.log('[server/index.js] error posting to db!', err);
			res.status(500);
			res.send(err);
		}

		// console.log('earnings posted to db!');
		res.status(200);
		res.send(data);
	})
})

// update to update earnings with actual

app.get('/stocks/:stock', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'));
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Running on port ${port}`));
