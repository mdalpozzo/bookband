const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HostProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'hostusers',
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  website: {
    type: [String],
  },
  rating: {
    type: Number,
  },
  completion: {
    type: Number,
  },
  contact: {
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  videos: {
    type: [String],
  },
  bio: {
    type: String,
  },
  genre: {
    type: [String],
  },
  price: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    }
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = HostProfile = mongoose.model('hostprofile', HostProfileSchema);