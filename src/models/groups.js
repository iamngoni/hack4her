const router = require("../routes");

const mongoose = require("mongoose");

let group = mongoose.Schema({
  name: String,
  description: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  },
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topics'
    }
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Members'
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model("Groups", group);