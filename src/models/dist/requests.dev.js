"use strict";

var mongoose = require("mongoose");

var request = mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Groups'
  },
  approved: {
    type: Boolean,
    "default": false
  }
});
module.exports = mongoose.model("Requests", request);