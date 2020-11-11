require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bp = require('body-parser');
const cors = require('cors');

// Express Settings
const app = express();
app.use(logger('dev'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', require('./routes'));

// Express Error Handling
app.get('*', function(req, res, next){
  setImmediate(function(){
    next(new Error("Route not found"));
  });
});

app.use(function(error, req, res, next){
  res.status(404).json({
    message: error.message
  });
});

module.exports = app;
