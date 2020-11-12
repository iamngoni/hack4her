const Images = require("./../models/images");
const Members = require("../models/members");
const Member = require("../types/members");

module.exports = {
  getMemberDetails: async function(req, res){
    let current_member = req.member;
    let member = await Members.findById(current_member.id).populate('image');
    if(!member){
      return res.status(404).json({errors: "member details not found"});
    }
    res.status(200).json({name: member.fullName, email: member.email, bio: member.bio, image: member.image, occupation: member.occupation, dateOfBirth: member.dateOfBirth, socialProfiles: member.socialProfiles});
  },
  postImage: async function(req, res){
    let current_member = req.member;
    let member = await Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "Member not found"});
    }

    let _member = new Member(member);
    let image = new Images({
      filename: req.file.filename,
      fileId: req.file.id
    });
    let _image = await image.save();
    if(!_image){
      return res.status(500).json({errors: "Couldn't save image"});
    }
    await _member.addImage(_image._id);
    return res.status(200).json({success: "Success"});
  }
}