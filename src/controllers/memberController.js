module.exports = {
  getMemberDetails: async function(req, res){
    let current_member = req.member;
    let member = await Members.findById(current_member.id);
    if(!member){
      return res.status(404).json({errors: "member details not found"});
    }
    res.status(200).json({name: member.fullName, email: member.email, bio: member.bio, image: member.image, occupation: member.occupation, dateOfBirth: member.dateOfBirth, socialProfiles: member.socialProfiles});
  }
}