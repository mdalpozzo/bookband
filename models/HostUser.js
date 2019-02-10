const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const HostUserSchema = new Schema({
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
  userType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = HostUser = mongoose.model('hostusers', HostUserSchema);