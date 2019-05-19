const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/public'));

app.get('/api/stocks/:stock/earnings', (req, res) => {
    controllers.getEarnings(req.params.stock, data => {
        res.send(data);
    });
});

app.get('/stocks/:stock', (req, res) => {
    res.sendFile(path.join(__dirname,'/../client/public/index.html'));
});

app.listen(port, () => console.log(`Running on port ${port}`));