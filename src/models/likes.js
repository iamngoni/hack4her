const mongoose = require("mongoose");

let like = mongoose.Schema({
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activities'
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  }
}, {timestamps: true});

module.exports = mongoose.model("Likes", like);