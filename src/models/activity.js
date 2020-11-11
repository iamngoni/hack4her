const mongoose = require("mongoose");

let activity = mongoose.Schema({
  type: String,
  parentID: String,
  likes: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

module.exports = mongoose.model("Activities", activity);