const mongoose = require("mongoose");

let requext = mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Groups'
  },
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Requestx", requext);