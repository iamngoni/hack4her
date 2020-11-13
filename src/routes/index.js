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

//Signup
router.post("/signup", [
  check('firstName', 'First Name is required').exists(),
  check('surname', 'Surname is required').exists(),
  check('email', 'Email is required or format is wrong').exists().isEmail(),
  check('bio', 'Bio is required').exists(),
  check('occupation', 'Occupation is required').exists(),
  check('dateOfBirth', 'Date Of Birth is required').exists(),
  check('password', 'Password is required or is less than 6 characters').exists().isLength({min: 6})
], controllers.AUTH.signup);
// Login
router.post("/login", [
  check('email', 'Email is required or format is wrong').exists().isEmail(),
  check('password', 'Password is required or is less than 6 characters').exists().isLength({min: 6})
], controllers.AUTH.login);
// Upload/update user avatar
router.post("/upload_member_image", [
  auth,
  uploads.single("avatar")
], controllers.MEMBERS.postImage);
// Get logged member information
router.get("/member_info", auth, controllers.MEMBERS.getMemberDetails);
router.get("/member_avatar/:filename", controllers.MEMBERS.getMemberAvatar);
// Create group
router.post("/groups/create", [
  auth,
  check('name', "Group name is required").exists().not().isEmpty(),
  check('description', 'Group description is required').exists().not().isEmpty()
], controllers.MEMBERS.createGroup);
//Create topic in group
router.post("/groups/:groupId/topics/create", auth, controllers.MEMBERS.createTopic);
//Get all group topics
router.get("/groups/:groupId/topics", auth, controllers.GROUPS.getTopics);
// List all groups
router.get("/groups/list", auth, controllers.GROUPS.getAllGroups);
// Add member to group
router.get("/groups/:groupId/members/add/:memberId", auth, controllers.GROUPS.addMember);
// Request entry to group
router.get("/groups/:groupId/request_entry", auth, controllers.MEMBERS.requestGroupEntry);
// Approve member request to enter group
router.get("/groups/requests/approve/:requestId", auth, controllers.MEMBERS.approveMemberEntry);
// Exit group
router.get("/groups/:groupId/exit", auth, controllers.MEMBERS.exitGroup);
// Get all group members
router.get("/groups/:groupId/members", auth, controllers.GROUPS.getMembers);
// Make a post in group topic
router.get("/groups/:groupId/topics/:topicId/posts/new", auth, controllers.MEMBERS.makeAPost);
// Get all posts
router.get("/groups/:groupId/topics/:topicId/posts", auth, controllers.TOPICS.getPosts);
// Comment on a post
router.post("/groups/:groupId/topics/:topicId/posts/:postId/comment", auth, controllers.POSTS.comment);
// Get list of all unapproved group requests
router.get("/groups/:groupId/requests", auth, controllers.GROUPS.getUnApprovedRequests);
// Get all comments for a post
router.get("/groups/:groupId/topics/:topicId/posts/:postId/comments", auth, controllers.POSTS.getComments);
// Get Number of comments of a post
router.get("/groups/:groupId/topics/:topicId/posts/:postId/comments_count", auth, controllers.POSTS.getNumberOfComments);
// Get Number of Votes on a topic
router.get("/groups/:groupId/topics/:topicId/votes", auth, controllers.TOPICS.getNumberOfVotes);
// Vote on a topic
router.get("/groups/:groupId/topics/:topicId/vote", auth, controllers.VOTES.vote);
// Get Groups followed by member
router.get("/member/:memberId/groups", controllers.MEMBERS.getGroupsJoined);
// Get single post
router.get("/groups/:groupId/topics/:topicId/posts/:postId/view", auth, controllers.POSTS.getSinglePost);

module.exports = router;