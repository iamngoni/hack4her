"use strict";

var router = require("../routes");

var mongoose = require("mongoose");

var group = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("Groups", group);