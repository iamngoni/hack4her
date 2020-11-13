const models = require("./../models");
const types = require("../types");

module.exports = {
  getPosts: async function(req, res){
    try{
      let current_member = req.member;
      let member = await models.Members.findById(current_member.id);
      if(!member){
        return res.status(200).json({errors: "Member not found"});
      }

      let group = await models.Groups.findById(req.params.groupId);
      if(!group){
        return res.status(404).json({errors: "Group not found"});
      }

      let topic = await models.Topics.findById(req.params.topicId).populate("posts");
      if(!topic){
        return res.status(200).json({errors: "Topic not found"});
      }

      let _topic = new types.Topic(topic);
      let posts = await _topic.getPosts();

      return res.status(200).json({success: "Success", posts});
    }catch(error){
      return res.status(500).json({errors: error.message});
    }
  },

  getNumberOfVotes: async function(req, res){
    try{
      let current_member = req.member;
      let member = await models.Members.findById(current_member.id);
      if(!member){
        return res.status(200).json({errors: "Member not found"});
      }

      let group = await models.Groups.findById(req.params.groupId);
      if(!group){
        return res.status(404).json({errors: "Group not found"});
      }

      let topic = await models.Topics.findById(req.params.topicId).populate("votes");
      if(!topic){
        return res.status(200).json({errors: "Topic not found"});
      }

      let _topic = new types.Topic(topic);
      let votes = await _topic.votesCount();
      return res.status(200).json({success: "Success", votes: votes});
    }catch(error){
      return res.status(500).json({errors: error.message});
    }
  }
};
