const authError = () => {
  const error = new Error('ошибка авторизации');
  error.statusCode = 401;
  throw error;
};

const validError = () => {
  const error = new Error('ошибка валидации');
  error.statusCode = 400;
  return error;
};

const noRightsError = () => {
  const error = new Error('нет прав доступа');
  error.statusCode = 403;
  return error;
};

const alreadyExistsError = () => {
  const error = new Error('Почта занята');
  error.statusCode = 409;
  return error;
};

const alreadyExistsIdError = () => {
  const error = new Error('Id занят');
  error.statusCode = 409;
  return error;
};

const notFoundPageErorr = () => {
  const error = new Error('страница не найдена');
  error.statusCode = 404;
  return error;
};

module.exports = {
  authError,
  validError,
  alreadyExistsError,
  notFoundPageErorr,
  noRightsError,
  alreadyExistsIdError,
};
