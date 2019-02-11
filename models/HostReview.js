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

module.exports = HostReview = mongoose.model('hostreview', HostReviewSchema);