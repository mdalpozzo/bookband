const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {
    login: {},
    register: {}
  };

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.userType = !isEmpty(data.userType) ? data.userType : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.register.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.register.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.register.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.register.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.register.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.register.password =
      'Password must be at least 6 characters, but no longer than 30';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.register.password2 = 'Password confirmation field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.register.password2 = 'Passwords must match';
  }

  if (Validator.isEmpty(data.userType)) {
    errors.register.userType = 'User type field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors.register)
  };
};
