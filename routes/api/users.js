const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');

// Load User Models
const ArtistUser = require('../../models/ArtistUser');
const HostUser = require('../../models//HostUser');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'users works!'});
});

// @route   POST api/users/register_artist
// @desc    Registers an artist users
// @access  Public
router.post('/register_artist', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  ArtistUser.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({email: 'An artist account is already registered with this email.'});
      } else {
        const newUser = new ArtistUser({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          userType: req.body.userType,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
              console.log(err);
            };
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
});

// @route   POST api/users/register_host
// @desc    Registers a host users
// @access  Public
router.post('/register_host', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

    //check validation
    if(!isValid) {
      return res.status(400).json(errors);
    }

  HostUser.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({email: 'A host account is already registered with this email.'});
      } else {
        const newUser = new HostUser({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          userType: req.body.userType,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
          })
        })
      }
    })
});

// @route   POST api/users/artist_login
// @desc    Login an artist user
// @access  Public
router.post('/login_artist', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  ArtistUser.findOne({ email })
    .then(user => {
      //check for user
      if(!user) {
        return res.status(404).json({email: 'An artist user account is not found with this email'});
      }

      //check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            //user matched

            const payload = { id: user.id, name: user.name, userType: user.userType }

            //sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 10000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token,
                })
            });
          } else {
            return res.status(400).json({password: 'Password incorrect'});
          }
        })
    })
});

// @route   POST api/users/host_login
// @desc    Login a host user
// @access  Public
router.post('/login_host', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  HostUser.findOne({ email })
    .then(user => {
      //check for user
      if(!user) {
        return res.status(404).json({email: 'A host user account not found with this email'});
      }

      //check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            //user matched

            const payload = { id: user.id, name: user.name, userType: user.userType }

            //sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 10000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token,
                })
            });
          } else {
            return res.status(400).json({password: 'Password incorrect'});
          }
        })
    })
});

// @route   POST api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    name: req.user.name,
    id: req.user.id,
    email: req.user.email,
    userType: req.user.userType,
  });
});



module.exports = router;