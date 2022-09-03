const ALLOWED_CORS = [
  'http://localhost:3000',
  'localhost:3000',
  'project-mesto72.nomoredomains.xyz',
  'http://project-mesto72.nomoredomains.xyz',
  'https://project-mesto72.nomoredomains.xyz',
  'http://api.diplomalit0s.nomoredomains.xyz',
  'https://api.diplomalit0s.nomoredomains.xyz',
  'http://api.diplomalit0s.nomoredomains.xyz',
  'api.diplomalit0s.nomoredomains.xyz',
];

const VALID_ERR_CODE = 400;
const AUTH_ERR_CODE = 401;
const NO_RIGHTS_ERR_CODE = 403;
const NOT_FOUND_PAGE_ERR_CODE = 404;
const ALREADY_EXISTS_ERR_CODE = 409;
const OTHER_ERR_CODE = 500;

const VALID_ERR_MESSAGE = 'ошибка валидации';
const AUTH_ERR_MESSAGE = 'ошибка авторизации';
const NO_RIGHTS_ERR_MESSAGE = 'нет прав доступа';
const NOT_FOUND_PAGE_ERR_MESSAGE = 'страница не найдена';
const ALREADY_EXISTS_ERR_MESSAGE = 'Почта занята';
const ALREADY_EXISTS_ID_ERR_MESSAGE = 'Id занят';
const INVALID_DATA_ERR_MESSAGE = 'неверный логин или пароль';
const OTHER_ERR_MESSAGE = 'Что-то пошло не так';

module.exports = {
  ALLOWED_CORS,
  VALID_ERR_CODE,
  AUTH_ERR_CODE,
  NO_RIGHTS_ERR_CODE,
  NOT_FOUND_PAGE_ERR_CODE,
  ALREADY_EXISTS_ERR_CODE,
  OTHER_ERR_CODE,
  VALID_ERR_MESSAGE,
  AUTH_ERR_MESSAGE,
  NO_RIGHTS_ERR_MESSAGE,
  NOT_FOUND_PAGE_ERR_MESSAGE,
  ALREADY_EXISTS_ERR_MESSAGE,
  ALREADY_EXISTS_ID_ERR_MESSAGE,
  INVALID_DATA_ERR_MESSAGE,
  OTHER_ERR_MESSAGE,
};
