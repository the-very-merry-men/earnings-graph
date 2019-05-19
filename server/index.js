const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/public'));

app.get('/api/stock/:stock/earnings', (req, res) => {
    controllers.getEarnings(req.params.stock, data => {
        res.send(data);
    });
});

app.listen(port, () => console.log(`Running on port ${port}`));