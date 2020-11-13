"use strict";

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

var controllers = require("./../controllers");

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

router.post("/signup", [check('firstName', 'First Name is required').exists().isEmpty(), check('surname', 'Surname is required').exists().isEmpty(), check('email', 'Email is required or format is wrong').exists().isEmail().isEmpty(), check('bio', 'Bio is required').exists().isEmpty(), check('occupation', 'Occupation is required').exists().isEmpty(), check('dateOfBirth', 'Date Of Birth is required').exists().isEmpty(), check('password', 'Password is required or is less than 6 characters').exists().isLength({
  min: 6
})], controllers.AUTH.signup);
router.post("/login", [check('email', 'Email is required or format is wrong').exists().isEmail(), check('password', 'Password is required or is less than 6 characters').exists().isLength({
  min: 6
})], controllers.AUTH.login);
router.post("/upload_member_image", [auth, uploads.single("avatar")], controllers.MEMBERS.postImage); // Member information

router.get("/member_info", auth, controllers.MEMBERS.getMemberDetails);
router.get("/member_avatar/:filename", controllers.MEMBERS.getMemberAvatar); // Group Activity

router.post("/groups/create", [auth, check('name', "Group name is required").exists().isEmpty(), check('description', 'Group description is required').exists().isEmpty()], controllers.MEMBERS.createGroup);
router.post("/groups/:groupId/topics/create", auth, controllers.MEMBERS.createTopic);
router.get("/groups/:groupId/topics", auth, controllers.GROUPS.getTopics);
router.get("/groups/list", auth, controllers.GROUPS.getAllGroups);
router.get("/groups/:groupId/members/add/:memberId", auth, controllers.GROUPS.addMember);
router.get("/groups/:groupId/request_entry", auth, controllers.MEMBERS.requestGroupEntry);
router.get("/groups/requests/approve/:requestId", auth, controllers.MEMBERS.approveMemberEntry);
router.get("/groups/:groupId/exit", auth, controllers.MEMBERS.exitGroup);
router.get("/groups/:groupId/members", auth, controllers.GROUPS.getMembers);
router.get("/groups/:groupId/topics/:topicId/posts/new", auth, controllers.MEMBERS.makeAPost);
router.get("/topics/:topicId/posts", auth, controllers.TOPICS.getPosts);
router.post("/topics/:topicId/posts/:postId/comment", auth, controllers.POSTS.comment);
module.exports = router;