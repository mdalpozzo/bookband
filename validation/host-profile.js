const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateHostProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.genre = !isEmpty(data.genre) ? data.genre : '';
  data.website = !isEmpty(data.website) ? data.website : '';
  data.videos = !isEmpty(data.videos) ? data.videos : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.country = !isEmpty(data.country) ? data.country : '';

  if(!Validator.isLength(data.handle, { min: 2, max: 40})){
    errors.handle = 'Handle must be between 2 and 40 characters';
  }

  if(!isEmpty(data.website)) {
    if(!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if(Validator.isEmpty(data.address)) {
    errors.address = 'Address is Required';
  }

  if(Validator.isEmpty(data.state)) {
    errors.state = 'State is Required';
  }

  if(Validator.isEmpty(data.country)) {
    errors.country = 'Country is Required';
  }

  if(!Validator.isLength(data.bio, { min: 0, max: 1000})) {
    errors.bio = 'Bio max length is 1000 characters';
  }

  if(!Validator.isLength(data.price, { min: 0, max: 50})) {
    errors.price = 'Bio max length is 50 characters';
  }

  if(!isEmpty(data.youtube)) {
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }
  
  if(!isEmpty(data.twitter)) {
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if(!isEmpty(data.facebook)) {
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if(!isEmpty(data.instagram)) {
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }


  return {
    errors,
    isValid: isEmpty(errors),
  }
}