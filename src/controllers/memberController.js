const types = require("../types");
const mongoose = require("mongoose");
const config = require("./../config");
const models = require("./../models");
const { validationResult } = require('express-validator');

const connect = mongoose.createConnection(config.db, {useNewUrlParser: true, useUnifiedTopology: true});

let gfs;

connect.once("open", function(){
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {bucketName: "uploads"});
});

module.exports = {
  getMemberDetails: async function(req, res){
    let current_member = req.member;
    let member = await models.Members.findById(current_member.id).populate('image');
    if(!member){
      return res.status(404).json({errors: "member details not found"});
    }
    res.status(200).json({id: member._id, name: member.fullName, email: member.email, bio: member.bio, image: member.image, occupation: member.occupation, dateOfBirth: member.dateOfBirth, socialProfiles: member.socialProfiles});
  },
  postImage: async function(req, res){
    let current_member = req.member;
    let member = await models.Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "Member not found"});
    }

    let _member = new types.Member(member);
    let image = new models.Images({
      filename: req.file.filename,
      fileId: req.file.id
    });
    let _image = await image.save();
    if(!_image){
      return res.status(500).json({errors: "Couldn't save image"});
    }
    await _member.addImage(_image._id);
    return res.status(201).json({success: "Success"});
  },
  
  createGroup: async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    let current_member = req.member;
    let member = await models.Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "Member not found"});
    }

    let _member = new types.Member(member);
    try{
      let group = await _member.createGroup(req.body.name, req.body.description);
      if(!group){
        return res.status(500).json({errors: "Couldn't create group"});
      }

      return res.status(201).json({success: "Success", group});
    }catch (error){
      if(error.code == 11000){
        return res.status(400).json({errors: "types.Group name already registered"});
      }
      return res.status(500).json({errors: "Server error"});
    }   
  },
  
  getMemberAvatar: async function(req, res){
    let filename = req.params.filename;
    gfs.find({filename: filename}).toArray(function(error, files){
      if(error){
        return res.status(500).json({errors: "Encountered and error"});
      }

      if(!files[0] || files.length === 0){
        return res.status(4040).json({
          errors: "No files available"
        });
      }

      if(files[0].contentType === "image/jpeg" || files[0].contentType === "image/png" || files[0].contentType === "image/svg+xml"){
        gfs.openDownloadStreamByName(filename).pipe(res);
      }else{
        res.status(404).json({
          errors: "File not an image"
        });
      }
    });
  },

  createTopic: async function(req, res){
    let current_member = req.member;
    let member = await models.Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "Couldn't find member"});
    }

    let group = await models.Groups.findById(req.params.groupId);
    if(!group){
      return res.status(404).json({errors: "Group not found"});
    }

    let _member = new types.Member(member);
    try{
      let topic = await _member.createTopic(req.params.groupId, req.body.title, req.body.description);
      if(!topic){
        return res.status(500).json({errors: "Couldn't save topic"});
      }

      return res.status(201).json({success: "Success", topic});
    }catch(error){
      if(error.code == 11000){
        return res.status(400).json({errors: "Topic already exists"});
      }
      return res.status(500).json({errors: "Server error"});
    }
  },

  requestGroupEntry: async function(req, res){
    let current_member = req.member;
    let member = await models.Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "Member not found"});
    }

    let group = await models.Groups.findById(req.params.groupId);
    if(!group){
      return res.status(404).json({errors: "Group not found"});
    }

    let _member = new types.Member(member);
    try{
      let request = await _member.requestGroupEntry(req.params.groupId);
      if(!request){
        return res.status(500).json({errors: "Request not processed"});
      }

      return res.status(201).json({success: "Success", request});
    }catch(error){
      console.log(error);
      return res.status(500).json({errors: error.message});
    }
  },

  approveMemberEntry: async function(req, res){
    let current_member = req.member;
    let member = await models.Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "Couldn't find member"});
    }

    let requestId = req.params.requestId;
    let request = await models.Requestx.findById(requestId);
    if(!request){
      return res.status(404).json({errors: "Request doesn't exist"});
    }

    let group = await models.Groups.findById(request.group);
    if(!group){
      return res.status(404).json({errors: "Group related to request doesn't exist"});
    }

    if(group.admin._id.toString() !== member._id.toString()){
      return res.status(403).json({errors: "You cannot approve requets to groups for which you're not an admin"});
    }

    let _group = new types.Group(group);
    try{
      let modifiedGroup = await _group.addMember(request.member);
      if(!modifiedGroup){
        return res.status(500).json({errors: "Failure"});
      }

      request.approved = true;
      let isRequestApproved = await request.save();
      if(!isRequestApproved){
        return res.status(500).json({errors: "Couldn't approve request"});
      }

      return res.status(201).json({success: "Success", group: modifiedGroup});
    }catch(error){
      return res.status(409).json({errors: error.message});
    }
  },

  exitGroup: async function(req, res){
    let current_member = req.member;
    let member = await models.Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "Member not found"});
    }

    let group = await models.Groups.findById(req.params.groupId);
    if(!group){
      return res.status(404).json({errors: "Group not found"});
    }

    let _member = new types.Member(member);
    try{
      let group = await _member.exitGroup(req.params.groupId);
      if(!group){
        return res.status(400).json({errors: "Failed to exit"});
      }

      return res.status(200).json({success: "Success", group});
    }catch(error){
      return res.status(500).json({errors: error.message});
    }
  },

  makeAPost: async function(req, res){
    try{
      let current_member = req.member;
      let member = await models.Members.findById(current_member.id);
      if(!member){
        return res.status(404).json({errors: "Member not found"});
      }

      let group = await models.Groups.findById(req.params.groupId);
      if(!group){
        return res.status(404).json({errors: "Group not found"});
      }

      let topic = await models.Topics.findById(req.params.topicId);
      if(!topic){
        return res.status(404).json({errors: "Topic not found"});
      }

      let _group = new types.Group(group);
      let topics = await _group.topics();

      let match = topics.filter((tpx) => tpx._id.toString() === topic._id.toString());

      if(match.length < 0){
        return res.status(403).json({errors: "Topic doesn't belong to selected group"});
      }

      let _member = new types.Member(member);
      let post = await _member.createPost(topic._id, req.body.text);
      if(!post){
        return res.status(500).json({errors: "Couldn't create post"});
      }

      let _topic = new types.Topic(topic);
      let _topc = await _topic.addPost(post._id);
      if(!_topc){
        return res.status(500).json({errors: "Couldn't save post"});
      }

      return res.status(200).json({success: "Success", post});
    }catch(error){
      console.log(error);
      return res.status(500).json({errors: error.message}); 
    }
  },

  getGroupsJoined: async function(req, res){
    try{
      let member = await models.Members.findById(req.params.memberId);
      if(!member){
        return res.status(404).json({errors: "member details not found"});
      }

      let _member = new types.Member(member);
      let groups = await _member.getGroupsJoined();
      return res.status(200).json({success: "Success", groups});
    }catch(error){
      return res.status(500).json({errors: error.message});
    }
  }
}