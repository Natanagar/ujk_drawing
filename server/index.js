const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
const users = require('./users.json');
dotenv.config();

const UserModel = require('../model/model');

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('../auth/auth');

const routes = require('../routes/routes');
const secureRoute = require('../routes/secure-routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use(pino);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.get('/api/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(users));
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log('Example app listening on port ' + port + '!')
);
