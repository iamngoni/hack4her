const mongoose = require("mongoose");

let image = mongoose.Schema({
  filename: String
}, {timestamps: true});

module.exports = mongoose.model("Images", image);