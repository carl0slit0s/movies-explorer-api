const express = require('express');
const bodyParser = require('body-parser');
const moviesdb = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
// const cors = require('cors');
// const helmet = require('helmet');

const { isAuthorized } = require('./middlewares/auth');
const routers = require('./routes/index');
const routerAuth = require('./routes/auth');
const { notFoundPageErorr } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
// app.use(helmet());

moviesdb.connect('mongodb://localhost:27017/bitfilmsdb');

// const allowedCors = [
//   'http://localhost:3000',
//   'http://api.diplomalit0s.nomoredomains.xyz/',
//   'https://api.diplomalit0s.nomoredomains.xyz/',
//   'api.diplomalit0s.nomoredomains.xyz/',
// ];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

// app.use(cors({
//   origin: allowedCors,
//   credentials: true,
// }));

app.use('/', routerAuth);

app.use(isAuthorized);
app.use('/', routers);

app.use((req, res, next) => {
  next(notFoundPageErorr());
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send(statusCode === 500
    ? { message: 'Что-то пошло не так' }
    : { message });
  next();
});

app.listen(PORT);
