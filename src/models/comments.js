const mongoose = require("mongoose");

let comment = mongoose.Schema({
  text: String,
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  }
}, {timestamps: true});

module.exports = mongoose.model("Comments", comment);