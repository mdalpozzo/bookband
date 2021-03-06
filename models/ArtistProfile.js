const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    url: {
      type: String,
    },
})

const ArtistProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'artistuser',
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
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  videos: [VideoSchema],
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

module.exports = ArtistProfile = mongoose.model('artistprofile', ArtistProfileSchema);