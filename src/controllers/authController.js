const Member = require("../types/members");
let messages = require("./../types/messages");

function signUpValidator(req, res, data){
  if(data.firstName == "" || data.firstName == null){
    return res.json({message: messages.MISSING_NAME});
  }else if(data.surname == "" || data.surname == null){
    return res.json({message: messages.MISSING_SURNAME});
  }else if(data.email == "" || data.email == null){
    return res.json({message: messages.MISSING_EMAIL});
  }else if(data.occupation == "" || data.occupation == null){
    return res.json({message: messages.MISSING_OCCUPATION});
  }else if(data.dateOfBirth == "" || data.dateOfBirth == null){
    return res.json({message: messages.MISSING_DATEOFBIRTH});
  }else if(data.password == "" || data.password == null || data.password.length < 6){
    return res.json({message: messages.MISSING_PASSWORD});
  }
}

module.exports = {
  signup: async function(req, res){
    let data = req.body;
    signUpValidator(req, res, data);
    let member = new Member(data.firstName, data.middleName ?? undefined, data.surname, data.email, data.bio ?? undefined, data.occupation, data.dateOfBirth, data.password);
    let i = await member.save();
    if(typeof i == Error){
      return res.json({error: i});
    }
    return res.status(200).json({message: "Member has been saved"})
  }
}