const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

require('dotenv').config();

const { MY_SECRET_KEY = 'MY_SECRET_KEY' } = process.env;

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

const tokenVerify = (token) => {
  try {
    return jwt.verify(token, MY_SECRET_KEY);
  } catch (err) {
    return '';
  }
};

module.exports = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return handleAuthError(next);
  }
  const payload = tokenVerify(token);
  if (!payload) {
    handleAuthError(next);
  }
  req.user = payload;
  return next();
};
