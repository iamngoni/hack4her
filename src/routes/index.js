const authcontroller = require("../controllers/controller");
const router = require("express").Router();
const { check } = require('express-validator');

const { upload } = require("../app");
const config = require("./../config");
const mongoose = require("mongoose");

const connect = mongoose.createConnection(config.db, {useNewUrlParser: true, useUnifiedTopology: true});

let gfs;

connect.once("open", function(){
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {bucketName: "uploads"});
});

// Auth Routes
router.post("/signup", [
  check('firstName', 'First Name is required').exists(),
  check('surname', 'Surname is required').exists(),
  check('email', 'Email is required or format is wrong').exists().isEmail(),
  check('bio', 'Bio is required').exists(),
  check('occupation', 'Occupation is required').exists(),
  check('dateOfBirth', 'Date Of Birth is required').exists(),
  check('password', 'Password is required or is less than 6 characters').exists().isLength({min: 6})
], authcontroller.signup);

router.post("/login", [
  check('email', 'Email is required or format is wrong').exists().isEmail(),
  check('password', 'Password is required or is less than 6 characters').exists().isLength({min: 6})
], authcontroller.login);

router.post("/upload_member_image", upload.single("avatar"), authcontroller.postImage);

module.exports = router;