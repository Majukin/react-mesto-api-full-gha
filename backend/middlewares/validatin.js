const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

require('dotenv').config();

const { MY_SECRET_KEY = 'MY_SECRET_KEY' } = process.env;

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return handleAuthError(next);
  }
  let payload;
  try {
    payload = jwt.verify(token, MY_SECRET_KEY);
  } catch (err) {
    return handleAuthError(next);
  }
  req.user = payload;
  return next();
};
