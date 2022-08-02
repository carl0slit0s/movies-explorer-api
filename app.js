const express = require('express');
const bodyParser = require('body-parser');
const moviesdb = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { limiter } = require('./middlewares/rateLimit');
require('dotenv').config();

const { NODE_ENV, MONGO_DB_ENV } = process.env;

const { MONGO_DB } = require('./config/config');
const { ALLOWED_CORS, OTHER_ERR_CODE, OTHER_ERR_MESSAGE } = require('./config/constants');

const routers = require('./routes/index');
const { notFoundPageErorr } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

moviesdb.connect(NODE_ENV === 'production' ? MONGO_DB_ENV : MONGO_DB);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use(cors({
  origin: ALLOWED_CORS,
  credentials: true,
}));

app.use('/', routers);

app.use((req, res, next) => {
  next(notFoundPageErorr());
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send(statusCode === OTHER_ERR_CODE
    ? { message: OTHER_ERR_MESSAGE }
    : { message });
  next();
});

app.listen(PORT);
