const mongoose = require("mongoose");

let image = mongoose.Schema({
  fileId: String,
  filename: String
}, {timestamps: true});

module.exports = mongoose.model("Images", image);