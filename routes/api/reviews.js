const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateArtistReviewInput = require('../../validation/artist-review');
const validateHostReviewInput = require('../../validation/host-review');

//load review models
const ArtistReview = require('../../models/ArtistReview');
const HostReview = require('../../models/HostReview');


// @route   GET api/reviews/test
// @desc    Tests reviews route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'reviews works!'});
});

// @route   GET api/reviews/profile/:profile_id
// @desc    Gets all reviews by profile_id
// @access  Public
router.get('/profile/:profile_id', (req, res) => {
  const errors = {};

  if (req.body.profileType === 'artist') {
    ArtistReview.find({ profile_id: req.params.profile_id })
      .then(reviews => {
        if(reviews.length === 0) {
          errors.noreviews = 'There are no reviews for this artist';
          return res.status(404).json(errors)
        }
        res.json(reviews);
      });
  } else if (req.body.profileType === 'host') {
    HostReview.find({ profile_id: req.params.profile_id })
    .then(reviews => {
      if(reviews.length === 0) {
        errors.noreviews = 'There are no reviews for this host';
        return res.status(404).json(errors)
      }
      res.json(reviews);
    });
  } else {
    return res.status(400).json('there is an issue with profileType');
  }
});

// @route   POST api/reviews
// @desc    Create a review
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }),  (req, res) => {
  if (req.body.profileType === 'artist') {
    const { errors, isValid } = validateArtistReviewInput(req.body);

    //check validation
    if(!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newReview = new ArtistReview({
      profile_id: req.body.profile_id,
      reviewer: {
        reviewerName: req.user.reviewerName,
        user_id: req.user.id,
        userType: req.user.userType,
      },
      title: req.body.title,
      text: req.body.text,
      rating: req.body.rating,
    });

    newReview.save().then(post => res.json(post));

  } else if (req.body.profileType === 'host') {
    const { errors, isValid } = validateHostReviewInput(req.body);

     //check validation
     if(!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newReview = new HostReview({
      profile_id: req.body.profile_id,
      reviewer: {
        reviewerName: req.user.reviewerName,
        user_id: req.user.id,
        userType: req.user.userType,
      },
      title: req.body.title,
      text: req.body.text,
      rating: req.body.rating,
    });

    newReview.save().then(post => res.json(post));


  } else {
    return res.status(400).json('there is an issue with profileType');
  }
});

module.exports = router;