const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateArtistReviewInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  data.rating = !isEmpty(data.rating) ? data.rating : '';

  if(!Validator.isLength(data.text, { min: 10, max: 500})){
    errors.text = 'Handle must be between 10 and 500 characters';
  }

  if(Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if(!Validator.isLength(data.title, { min: 0, max: 40})){
    errors.title = 'Title must be between 0 and 40 characters';
  }

  if(Validator.isEmpty(data.rating)) {
    errors.rating = 'Rating is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}