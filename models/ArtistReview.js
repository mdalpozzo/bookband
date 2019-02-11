const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewerSchema = new Schema({
  reviewerName: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
  },
  userType: {
    type: String,
  }
});

const ArtistReviewSchema = new Schema({
  reviewType: {
    type: String,
    required: true,
  },
  profile_id: {
    type: Schema.Types.ObjectId,
    ref: 'artistprofile',
  },
  reviewer: ReviewerSchema,
  title: {
    type: String,
    max: 40,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ArtistReview = mongoose.model('artistreview', ArtistReviewSchema);