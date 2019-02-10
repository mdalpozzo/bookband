const express = require('express');
const router = express.Router();

// @route   GET api/reviews/test
// @desc    Tests reviews route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'reviews works!'});
});

module.exports = router;