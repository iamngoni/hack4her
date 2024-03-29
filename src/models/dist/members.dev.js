"use strict";

var mongoose = require("mongoose");

var jwt = require("jsonwebtoken");

var crypto = require("crypto");

var member = mongoose.Schema({
  firstName: {
    type: String,
    index: true
  },
  middleName: {
    type: String,
    index: true
  },
  surname: {
    type: String,
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "email can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    unique: true
  },
  bio: String,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Images'
  },
  occupation: String,
  dateOfBirth: Date,
  socialProfiles: [{
    twitter: String
  }, {
    facebook: String
  }, {
    linkedIn: String
  }, {
    instagram: String
  }],
  passwordResetKey: String,
  hash: String,
  salt: String
}, {
  timestamps: true
});

member.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

member.methods.validatePassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

member.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    id: this._id,
    email: this.email,
    exp: parseInt(exp.getTime() / 1000)
  }, process.env.SECRET.toString());
};

member.virtual('fullName').get(function () {
  var fullName = "";
  fullName += this.firstName;
  fullName += " ";

  if (this.middleName) {
    fullName += this.middleName;
    fullName += " ";
  }

  fullName += this.surname;
  return fullName;
});

member.methods.toAuthJson = function () {
  return {
    name: this.fullName,
    email: this.email,
    bio: this.bio,
    image: this.image,
    occupation: this.occupation,
    dateOfBirth: this.dateOfBirth,
    socialProfiles: this.socialProfiles,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model('Members', member);