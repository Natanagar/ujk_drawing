const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const dotenv = require('dotenv');
const users = require('./users.json');
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(users));
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log('Example app listening on port ' + port + '!')
);
