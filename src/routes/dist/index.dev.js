"use strict";

var authcontroller = require("../controllers/controller");

var router = require("express").Router();

var _require = require('express-validator'),
    check = _require.check;

var config = require("./../config");

var mongoose = require("mongoose");

var multer = require('multer');

var GridFsStorage = require('multer-gridfs-storage');

var crypto = require('crypto');

var path = require('path');

var auth = require("./auth");

var memberController = require("../controllers/memberController");

var groupController = require("../controllers/groupController");

var connect = mongoose.createConnection(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var gfs;
connect.once("open", function () {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads"
  });
}); // GridFs Storage Engine

var storage = new GridFsStorage({
  url: config.db,
  file: function file(req, _file) {
    return new Promise(function (resolve, reject) {
      crypto.randomBytes(16, function (error, buffer) {
        if (error) {
          return reject(error);
        }

        var filename = buffer.toString('hex') + path.extname(_file.originalname);
        var fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
var uploads = multer({
  storage: storage
}); // Auth Routes

router.post("/signup", [check('firstName', 'First Name is required').exists(), check('surname', 'Surname is required').exists(), check('email', 'Email is required or format is wrong').exists().isEmail(), check('bio', 'Bio is required').exists(), check('occupation', 'Occupation is required').exists(), check('dateOfBirth', 'Date Of Birth is required').exists(), check('password', 'Password is required or is less than 6 characters').exists().isLength({
  min: 6
})], authcontroller.signup);
router.post("/login", [check('email', 'Email is required or format is wrong').exists().isEmail(), check('password', 'Password is required or is less than 6 characters').exists().isLength({
  min: 6
})], authcontroller.login);
router.post("/upload_member_image", [auth, uploads.single("avatar")], memberController.postImage); // Member information

router.get("/member_info", auth, memberController.getMemberDetails);
router.get("/member_avatar/:filename", memberController.getMemberAvatar); // Group Activity

router.post("/groups/create", auth, memberController.createGroup);
router.post("/groups/:groupId/topics/create", auth, memberController.createTopic);
router.get("/groups/:groupId/topics", auth, groupController.getTopics);
router.get("/groups/list", auth, groupController.getAllGroups);
router.get("/groups/:groupId/members/add/:memberId", auth, groupController.addMember);
router.get("/groups/:groupId/request_entry", auth, memberController.requestGroupEntry);
router.get("/groups/requests/approve/:requestId", auth, memberController.approveMemberEntry);
router.get("/groups/:groupId/exit", auth, memberController.exitGroup);
router.get("/groups/:groupId/members", auth, groupController.getMembers);
module.exports = router;