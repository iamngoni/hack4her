const mongoose = require("mongoose");

let like = mongoose.Schema({
  activityID: String,
  memberID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  }
}, {timestamps: true});

module.exports = mongoose.model("Likes", like);