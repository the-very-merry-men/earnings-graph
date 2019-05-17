const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/public'));

app.get('/stocks/:stock', (req, res) => {
    res.send(req.params.stock);
});

app.listen(port, () => console.log(`Running on port ${port}`));