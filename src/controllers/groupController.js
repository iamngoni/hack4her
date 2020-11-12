const models = require("./../models");
const types = require("./../types");

module.exports = {
  getTopics: async function(req, res){
    let group = await models.Groups.findById(req.params.groupId);
    if(!group){
      return res.status(404).json({errors: "Group not found"});
    }

    let _group = new types.Group(group);
    let topics = await _group.topics();
    return res.status(200).json({success: "Success", topics});
  },

  getAllGroups: async function(req, res){
    let groups = await models.Groups.find();
    return res.status(200).json({success: "Success", groups});
  },

  addMember: async function(req, res){
    let current_member = req.member;
    let member = await models.Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "Member not found"});
    }

    let group = await models.Groups.findById(req.params.groupId);
    if(!group){
      return res.status(404).json({errors: "Group not found"});
    }

    if(group.admin._id.toString() !== member._id.toString()){
      return res.status(403).json({errors: "Only group admin can add a member"});
    }

    let _group = new types.Group(group);
    try{
      let modifiedGroup = await _group.addMember(req.params.memberId);
      if(!modifiedGroup){
        return res.status(418).json({errors: "Cannot brew coffee"});
      }

      return res.status(201).json({success: "Success", group: modifiedGroup});
    }catch(error){
      return res.status(409).json({errors: error.message});
    }
  },

  getMembers: async function(req, res){
    let current_member = req.member;
    let member = await models.Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "Couldn't find member"});
    }

    let group = await models.Groups.findById(req.params.groupId).populate("members");
    if(!group){
      return res.status(404).json({errors: "Group not found"});
    }

    let _group = new types.Group(group);
    return res.status(200).json({success: "Success", group: group.name, members: _group.getMembers()});
  }
};