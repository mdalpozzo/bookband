require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Body parser middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Config
const dbURI = require('./config/keys.js').mongoURI;

const dbURL = process.env.DB_HOST || dbURI;
const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose
  .connect(dbURL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set Static folder
  app.use(express.static('./client/public'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/public/index.html'), err => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
} else {
  // serve static files
  app.use('/', express.static(path.join(__dirname, './client/public')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/public/index.html'), err => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

app.listen(port, () =>
  console.log(
    `Server's good to go on port ${port}... and may I say... you have got it going on today!`
  )
);
