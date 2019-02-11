const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateVideoInput(data) {
  let errors = {};

  data.videos = !isEmpty(data.videos) ? data.videos : '';

  if(isEmpty(data.videos)) {
    errors.videos = 'You havent added any video url'
  }

  console.log(data.videos);
  const videoArray = data.videos.split(',');

  for (i = 0; i < videoArray.length; i++) {
      if(!Validator.isURL(videoArray[i])) {
        if (typeof errors.videos === 'undefined') {
          errors.videos = [`Video number ${i + 1} is not a valid URL`];
        }
        errors.videos.push(`Video number ${i + 1} is not a valid URL`);
      }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}