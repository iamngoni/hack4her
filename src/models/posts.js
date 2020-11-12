const mongoose = require("mongoose");

let post = mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topics'
  },
  text: String,
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model("Posts", post);