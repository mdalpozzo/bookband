const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateArtistProfileInput = require('../../validation/artist-profile');
const validateHostProfileInput = require('../../validation/host-profile');

//load profile models
const ArtistProfile = require('../../models/ArtistProfile');
const HostProfile = require('../../models/HostProfile');

//load user models
const ArtistUser = require('../../models/ArtistUser');
const HostUser = require('../../models/HostUser');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'profile works!'});
});

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  if (req.user.userType === 'artist') {
    ArtistProfile.findOne({ user: req.user.id })
      .then(profile => {
        if(!profile) {
          errors.noprofile = 'There is no profile for this artist user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  } else if ( req.user.userType === 'host') {
    HostProfile.findOne({ user: req.user.id })
      .then(profile => {
        if(!profile) {
          errors.noprofile = 'There is no profile for this host user'
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  } else {
    return res.status(400).json('there is an issue with userType');
  }
});

// @route   POST api/profile/
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.user.userType === 'artist') {
    const { errors, isValid } = validateArtistProfileInput(req.body);

    //check validation
    if(!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }
    
    //fill profile fields object
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(typeof req.body.website !== 'undefined') {
      profileFields.website = req.body.website.split(',');
    }
    profileFields.contact = {};
    if(req.body.phone) profileFields.contact.phone = req.body.phone;
    if(req.body.email) profileFields.contact.email = req.body.email;
    if(req.body.address) profileFields.contact.address = req.body.address;
    if(req.body.city) profileFields.contact.city = req.body.city;
    if(req.body.state) profileFields.contact.state = req.body.state;
    if(req.body.country) profileFields.contact.country = req.body.country;
    if(typeof req.body.videos !== 'undefined') {
      profileFields.videos = req.body.videos.split(',');
    }
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(typeof req.body.genre !== 'undefined') {
      profileFields.genre = req.body.genre.split(',');
    }
    if(req.body.price) profileFields.price = req.body.price;
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.date) profileFields.date = req.body.date;

    ArtistProfile.findOne({ user: req.user.id })
      .then(profile => {
        if(profile) {
          //update
          ArtistProfile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile));
        } else {
        //create

          //check if handle exists
          ArtistProfile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if(profile) {
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
              }

              // save profile
              new ArtistProfile(profileFields.save().then(profile => res.json(profile)));
            })
        }
      });

  } else if (req.user.userType === 'host') {
    const { errors, isValid } = validateHostProfileInput(req.body);

    //check validation
    if(!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    //fill profileFields object
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(typeof req.body.website !== 'undefined') {
      profileFields.website = req.body.website.split(',');
    }
    profileFields.contact = {};
    if(req.body.phone) profileFields.contact.phone = req.body.phone;
    if(req.body.email) profileFields.contact.email = req.body.email;
    if(req.body.address) profileFields.contact.address = req.body.address;
    if(req.body.city) profileFields.contact.city = req.body.city;
    if(req.body.state) profileFields.contact.state = req.body.state;
    if(req.body.country) profileFields.contact.country = req.body.country;
    if(typeof req.body.videos !== 'undefined') {
      profileFields.videos = req.body.videos.split(',');
    }
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(typeof req.body.genre !== 'undefined') {
      profileFields.genre = req.body.genre.split(',');
    }
    if(req.body.price) profileFields.price = req.body.price;
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.date) profileFields.date = req.body.date;

    HostProfile.findOne({ user: req.user.id })
    .then(profile => {
      if(profile) {
        //update
        HostProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile));
      } else {
      //create

        //check if handle exists
        HostProfile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if(profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }

            // save profile
            new HostProfile(profileFields.save().then(profile => res.json(profile)));
          })
      }
    });
  } else {
    return res.status(400).json('there is an issue with userType');
  }
});

module.exports = router;