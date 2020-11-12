const Members = require("./../models/members");
const Groups = require("./../models/groups");

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

  async createGroup(name, description){
    let group = new Groups({
      name: name,
      description: description,
      admin: this.member._id
    });
    let _group = await group.save();
    return _group;
  }

  async followGroup(){

  }

  async unfollowGroup(){

  }

  createPost(){

  }

  createTopic(){

  }

  vote(){

  }
}

module.exports = Member;