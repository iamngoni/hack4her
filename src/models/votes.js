const mongoose = require("mongoose");

let vote = mongoose.Schema({}, {timestamps: true})

module.exports = mongoose.model("Votes", vote);