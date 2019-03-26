const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {
    login: {},
    register: {}
  };

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.login.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.login.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.login.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.userType)) {
    errors.login.userType = 'Must select a user type';
  }

  return {
    errors,
    isValid: isEmpty(errors.login)
  };
};
