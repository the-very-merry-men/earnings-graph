require('newrelic');

const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const controllers = require('./controllers/index.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/public')));

app.get('/api/stocks/:stock/earnings', (req, res) => {

  let id = parseInt(req.params.stock);
  console.log('req.params.stock:', typeof id, id);

  controllers.getEarnings(req.params.stock, (data) => {
  	console.log('data received from psql!', data);
  	console.log('[server/index.js] rows of that received from db:', data.rows);
    res.send(data.rows);
  });
});

app.get('/stocks/:stock', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'));
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Running on port ${port}`));
