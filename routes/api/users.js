const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Models
const ArtistUser = require('../../models/ArtistUser');
const HostUser = require('../../models//HostUser');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'users works!' });
});

// @route   POST api/users/register_artist
// @desc    Registers an artist users
// @access  Public
router.post('/register_artist', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    console.log('NOT VALID', errors);
    return res.status(400).json(errors);
  }

  ArtistUser.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.register.email =
        'An artist account is already registered with this email.';
      return res.status(400).json(errors);
    } else {
      const newUser = new ArtistUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/register_host
// @desc    Registers a host users
// @access  Public
router.post('/register_host', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  HostUser.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'A host account is already registered with this email.';
      return res.status(400).json(errors);
    } else {
      const newUser = new HostUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;

  if (userType === 'artist') {
    // find user by email
    ArtistUser.findOne({ email }).then(user => {
      //check for user
      if (!user) {
        errors.login.email =
          'An artist user account is not found with this email';
        return res.status(404).json(errors);
      }

      //check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //user matched

          const payload = {
            id: user.id,
            name: user.name,
            userType: user.userType
          };

          //sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 10000 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.login.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
  } else if (userType === 'host') {
    // find user by email
    HostUser.findOne({ email }).then(user => {
      //check for user
      if (!user) {
        errors.login.email = 'A Host user account is not found with this email';
        return res.status(404).json(errors);
      }

      //check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //user matched

          const payload = {
            id: user.id,
            name: user.name,
            userType: user.userType
          };

          //sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 10000 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.login.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
  }
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      name: req.user.name,
      id: req.user.id,
      email: req.user.email,
      userType: req.user.userType
    });
  }
);

module.exports = router;
