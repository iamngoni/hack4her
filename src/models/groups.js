const router = require("../routes");

const mongoose = require("mongoose");

let group = mongoose.Schema({
  title: String,

});

module.exports = mongoose.model("Groups", group);