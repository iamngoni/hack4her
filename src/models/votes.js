const mongoose = require("mongoose");

let vote = mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topics'
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  }
}, {timestamps: true});

module.exports = mongoose.model("Votes", vote);