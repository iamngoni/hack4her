const Members = require("../models/members");
const { validationResult } = require('express-validator');
const Images = require("./../models/images");

module.exports = {
  signup: async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }

    let member = new Members({
      firstName: req.body.firstName,
      middleName: req.body.middleName ?? undefined,
      surname: req.body.surname,
      email: req.body.email,
      bio: req.body.bio,
      occupation: req.body.occupation,
      dateOfBirth: req.body.dateOfBirth
    });

    member.setPassword(req.body.password);
    try{
      let _member = await member.save();
      if(!_member){
        return res.status(422).json({errors: "Couldn't save user"});
      }
      return res.status(200).json({success: "Member saved with id: " + _member._id});
    }catch(error){
      if(error.code == 11000){
        return res.status(400).json({errors: "User already registered with " + Object.keys(error.keyPattern)});
      }
      return res.status(500).json({errors: "Server error"});
    }
  },

  login: async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }

    let member = await Members.findOne({email: req.body.email});

    if(!member){
      return res.status(404).json({errors: "Email doesn't exist"});
    }

    if(!member.validatePassword(req.body.password)){
      return res.status(403).json({errors: "Email and password mismatch"});
    }

    return res.status(200).json({success: "Success", data: member.toAuthJson()})
  },
  
  postImage: async function(req, res){
    let image = new Images({
      filename: req.file.filename,
      fileId: req.file.id
    });
    let _image = await image.save();
    if(!_image){
      return res.status(500).json({errors: "Couldn't save image"});
    }

    return res.status(200).json({
      success: "Success",
      image: _image
    });
  },

  getMemberDetails: async function(req, res){
    let current_member = req.member;
    let member = await Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "member details not found"});
    }
    res.status(200).json({name: member.fullName, email: member.email, bio: member.bio, image: member.image, occupation: member.occupation, dateOfBirth: member.dateOfBirth, socialProfiles: member.socialProfiles});
  }
}