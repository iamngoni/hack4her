"use strict";

var mongoose = require("mongoose");

var comment = mongoose.Schema({
  text: String,
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Comments", comment);