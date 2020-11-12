const Members = require("./../models/members");

class Member{
  constructor(member){
    this.member = member;
  }

  /**
   * Update member profile
   * @param {String} id
   */
  async addImage(id){
    this.member.image = id;
    this.member.save().then(function(){
      console.log("Member profile image updated");
    }).catch(function(error){
      console.log(error);
    });
  }
}

module.exports = Member;