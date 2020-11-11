const Members = require("./../models/members");

class Member{
  constructor(member){
    this.member = member;
  }

  /**
   * Update member profile
   * @param {String} path 
   */
  async addImage(path){
    this.member.image = path;
    this.member.save();
  }
}

module.exports = Member;