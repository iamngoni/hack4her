require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bp = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const config = require('./config');

// Express Settings
const app = express();
app.use(logger('dev'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride('_method'));
app.use('/api', require('./routes'));

// GridFs Storage Engine
const storage = new GridFsStorage({
  url: config.db,
  file(req, file) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (error, buffer) => {
        if (error) {
          return reject(error);
        }
        const filename = buffer.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// Express Error Handling
app.get('*', (req, res, next) => {
  setImmediate(() => next(new Error('Route not found')));
});

app.use((error, req, res, next) => {
  res.status(404).json({
    message: error.message,
  });
  next();
});

module.exports = {
  app,
  upload
};
