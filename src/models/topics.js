const mongoose = require("mongoose");

let topic = mongoose.Schema({
  title: String,
  details: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  }
}, {timestamps: true});

module.exports = mongoose.model('Topics', topic);