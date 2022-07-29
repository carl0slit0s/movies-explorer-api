const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const { isAuthorized } = require('./middlewares/auth');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const routerAuth = require('./routes/auth');
const { notFoundPageErorr } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', routerAuth);

app.use(isAuthorized);
app.use('/users', routerUsers);
app.use('/movies', routerMovies);

app.use((req, res, next) => {
  next(notFoundPageErorr());
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: 'что-то пошло не так' });
});

app.listen(PORT);
