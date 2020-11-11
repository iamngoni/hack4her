const mongoose = require("mongoose");

let like = mongoose.Schema({
  activity: String,
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  }
}, {timestamps: true});

module.exports = mongoose.model("Likes", like);