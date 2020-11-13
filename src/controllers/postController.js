const models = require("./../models");
const types = require("../types");

module.exports = {
  comment: async function(req, res){
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

      let post = await models.Posts.findById(req.params.postId);
      if(!post){
        return res.status(404).json({errors: "Post not found"});
      }

      let comment = new models.Comments({
        member: member._id,
        text: req.body.text,
        post: post._id
      });

      let _comment = await comment.save();
      if(!_comment){
        return res.status(500).json({errors: "Comment not saved"});
      }

      let _post = new types.Post(post);
      let _postc = await _post.addComment(_comment._id);
      if(!_postc){
        return res.status(500).json({errors: "Couldn't attach comments to post"});
      }

      return res.status(200).json({success: "Success", post: _postc});
    }catch(error){
      console.log(error);
      return res.status(500).json({errors: error.message});
    }
  },

  getComments: async function(req, res){
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

      let post = await models.Posts.findById(req.params.postId).populate("comments");
      if(!post){
        return res.status(404).json({errors: "Post not found"});
      }

      let _post = new types.Post(post);
      let comments = await _post.getComments();
      return res.status(200).json({success: "Success", comments});
    }catch(error){
      return res.status(500).json({errors: error.message});
    }
  },

  getCommentsCount: async function(req, res){
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

      let post = await models.Posts.findById(req.params.postId).populate("comments");
      if(!post){
        return res.status(404).json({errors: "Post not found"});
      }

      let _post = new types.Post(post);
      let comments = await _post.getNumberOfComments();
      return res.status(200).json({success: "Success", commentsCount: comments});
    }catch(error){
      return res.status(500).json({errors: error.message});
    }
  }
};