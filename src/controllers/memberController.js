const types = require("../types");
const mongoose = require("mongoose");
const config = require("./../config");
const models = require("./../models");

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

    let _member = new types.Member(member);
    try{
      let request = await _member.requestGroupEntry(req.params.groupId);
      if(!request){
        return res.status(500).json({errors: "Request not processed"});
      }

      return res.status(201).json({success: "Success", request});
    }catch(error){
      return res.status(500).json({errors: "Requests was posted already. Still waiting for approval"});
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
      return res.status(404).json({errors: "types.Group related to request doesn't exist"});
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
  }
}