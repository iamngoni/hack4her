const router = require("express").Router();
const { check } = require('express-validator');
const config = require("./../config");
const mongoose = require("mongoose");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const auth = require("./auth");
const controllers = require("./../controllers");

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
], controllers.AUTH.signup);

router.post("/login", [
  check('email', 'Email is required or format is wrong').exists().isEmail(),
  check('password', 'Password is required or is less than 6 characters').exists().isLength({min: 6})
], controllers.AUTH.login);

router.post("/upload_member_image", [
  auth,
  uploads.single("avatar")
], controllers.MEMBERS.postImage);

// Member information
router.get("/member_info", auth, controllers.MEMBERS.getMemberDetails);
router.get("/member_avatar/:filename", controllers.MEMBERS.getMemberAvatar);

// Group Activity
router.post("/groups/create", [
  auth,
  check('name', "Group name is required").exists().not().isEmpty(),
  check('description', 'Group description is required').exists().not().isEmpty()
], controllers.MEMBERS.createGroup);
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
