const Member = require("../types/members");

module.exports = {
  signup: async function(req, res){
    let data = req.body;
    let member = new Member(data.firstName, data.middleName ?? undefined, data.surname, data.email, data.bio ?? undefined, data.occupation, data.dateOfBirth);
    let i = await member.save();
    if(typeof i == Error){
      return res.json({error: i});
    }
    return res.status(200).json({message: "Member has been saved"})
  }
}