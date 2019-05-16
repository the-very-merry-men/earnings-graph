const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/public'));
// app.get('/', (req, res) => {
//     res.send('bruddda');
// });
app.listen(port);
