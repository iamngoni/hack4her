require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bp = require('body-parser');
const cors = require('cors');

const app = express();
app.use(logger('dev'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use(require('./routes'));

module.exports = app;
