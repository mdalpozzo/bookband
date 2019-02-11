const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const ArtistUser = mongoose.model('artistuser');
const HostUser = mongoose.model('hostuser');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.userType === 'artist') {
      ArtistUser.findById(jwt_payload.id)
        .then(user => {
          if(user){
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    } else if (jwt_payload.userType === 'host') {
      HostUser.findById(jwt_payload.id)
        .then(user => {
          if(user){
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    } else {
      console.log('error with userType.  not specified or not equal to artist or host');
    }
  }));
};