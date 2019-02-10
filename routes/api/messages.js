const express = require('express');
const router = express.Router();

// @route   GET api/messages/test
// @desc    Tests messages route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'messages works!'});
});

module.exports = router;