const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ArtistUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = ArtistUser = mongoose.model('artistusers', ArtistUserSchema);