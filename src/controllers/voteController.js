const models = require("./../models");
const types = require("../types");
const { json } = require("body-parser");

module.exports = {
  vote: async function(req, res){
    try{
      let current_member = req.member;
      let member = await models.Members.findById(current_member.id);
      if(!member){
        return res.status(404).json({errors: "Member not found"});
      }

      let topic = await models.Topics.findById(req.params.topicId);
      if(!topic){
        return res.status(404).json({errors: "No topic found"});
      }

      let exists = models.Votes.find({
        topic: topic._id,
        member: member._id
      });

      if(exists.length > 0){
        return res.status(403).json({errors: "Member cannot vote multiple times on one topic"});
      }

      let vote = new models.Votes({
        topic: topic._id,
        member: member._id
      });

      let _vote = await vote.save();
      if(!_vote){
        return res.status(500).json({errors: "Couldn't save vote"});
      }

      let _topic = new types.Topic(topic);
      let _topc = await _topic.addVote(_vote._id);

      if(!_topc){
        return res.status(500).json({errors: "Encountered an  error"});
      }

      res.status(201).json({success: "Success", vote: _vote});
    }catch(error){
      return res.status(500).json({errors: error.message});
    }
  }
};