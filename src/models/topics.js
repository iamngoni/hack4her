const mongoose = require("mongoose");

let topic = mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  description: String,
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Groups'
  },
  initiator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts'
    }
  ],
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Votes'
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model('Topics', topic);