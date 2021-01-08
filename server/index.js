const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
const users = require('./users.json');
const cors = require('cors');
dotenv.config();

const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
// TODO change to enviroment varialbe process.env.JWT_SECRET
const jwtMW = exjwt({ secret: 'secret', algorithms: ['RS256'] });

const getBearerToken = (header, callback) => {
  if (header) {
    console.log(header);
    const token = header.split(' ');
    if (token) {
      return callback(null, token[0]);
    } else {
      return callback('Malformed bearer token', null);
    }
  } else {
    return callback('Missing authorization header', null);
  }
};

const validateToken = (req, res, next) => {
  getBearerToken(req.headers['Authorization'], (error, token) => {
    if (error) {
      return res.status(401).json({ success: false, message: error });
    }
    let decoded = '';
    try {
      decoded = jwt.verify(token, 'testing out a secret');
    } catch (error) {
      return res.status(401).send({
        success: false,
        error: 'Invalid authorization token',
      });
    }
    if (decoded.authorized) {
      req.decodedToken = decoded;
      next();
    } else {
      return res.status(401).send({ success: false, error: '2fa is required' });
    }
  });
};

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
app.use(cors({ credentials: true, origin: 'http://localhost:3006' }));
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
