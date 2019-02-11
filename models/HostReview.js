const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  }
});

const HostReviewSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'hostprofile',
  },
  reviewer: [ReviewerSchema],
  title: {
    type: String,
    max: 40,
  },
  body: {
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

module.exports = HostReview = mongoose.model('hostreview', HostReviewSchema);