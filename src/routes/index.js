const authcontroller = require("../controllers/controller");
const router = require("express").Router();
const { check } = require('express-validator');
const config = require("./../config");
const mongoose = require("mongoose");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const auth = require("./auth");
const memberController = require("../controllers/memberController");

const connect = mongoose.createConnection(config.db, {useNewUrlParser: true, useUnifiedTopology: true});

let gfs;

connect.once("open", function(){
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {bucketName: "uploads"});
});

// GridFs Storage Engine
const storage = new GridFsStorage({
  url: config.db,
  file(req, file) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (error, buffer) => {
        if (error) {
          return reject(error);
        }
        const filename = buffer.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const uploads = multer({ storage });

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

router.post("/upload_member_image", [
  auth,
  uploads.single("avatar")
], memberController.postImage);

// Member information
router.get("/member_info", auth, memberController.getMemberDetails);
router.get("/member_avatar/:filename", memberController.getMemberAvatar);

// Group Activity
router.post("/groups/create", auth, memberController.createGroup);
router.post("/groups/:groupId/topics/create", auth, memberController.createTopic);

module.exports = router;