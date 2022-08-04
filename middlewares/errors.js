const {
  VALID_ERR_CODE,
  AUTH_ERR_CODE,
  NO_RIGHTS_ERR_CODE,
  NOT_FOUND_PAGE_ERR_CODE,
  ALREADY_EXISTS_ERR_CODE,
  VALID_ERR_MESSAGE,
  AUTH_ERR_MESSAGE,
  NO_RIGHTS_ERR_MESSAGE,
  NOT_FOUND_PAGE_ERR_MESSAGE,
  ALREADY_EXISTS_ERR_MESSAGE,
  ALREADY_EXISTS_ID_ERR_MESSAGE,
  INVALID_DATA_ERR_MESSAGE,
} = require('../config/constants');

const authError = () => {
  const error = new Error(AUTH_ERR_MESSAGE);
  error.statusCode = AUTH_ERR_CODE;
  throw error;
};

const invalidData = () => {
  const error = new Error(INVALID_DATA_ERR_MESSAGE);
  error.statusCode = AUTH_ERR_CODE;
  throw error;
};

const validError = () => {
  const error = new Error(VALID_ERR_MESSAGE);
  error.statusCode = VALID_ERR_CODE;
  return error;
};

const noRightsError = () => {
  const error = new Error(NO_RIGHTS_ERR_MESSAGE);
  error.statusCode = NO_RIGHTS_ERR_CODE;
  return error;
};

const alreadyExistsError = () => {
  const error = new Error(ALREADY_EXISTS_ERR_MESSAGE);
  error.statusCode = ALREADY_EXISTS_ERR_CODE;
  return error;
};

const alreadyExistsIdError = () => {
  const error = new Error(ALREADY_EXISTS_ID_ERR_MESSAGE);
  error.statusCode = ALREADY_EXISTS_ERR_CODE;
  return error;
};

const notFoundPageErorr = () => {
  const error = new Error(NOT_FOUND_PAGE_ERR_MESSAGE);
  error.statusCode = NOT_FOUND_PAGE_ERR_CODE;
  return error;
};

module.exports = {
  authError,
  validError,
  alreadyExistsError,
  notFoundPageErorr,
  noRightsError,
  alreadyExistsIdError,
  invalidData,
};
