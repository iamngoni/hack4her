const Groups = require("./../models/groups");
const Topics = require("../models/topics");

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
      admin: this.member._id,
      members: [this.member._id]
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

  async createTopic(groupId, title, description){
    let topic = new Topics({
      title: title,
      description: description,
      group: groupId,
      initiator: this.member._id
    });

    let _topic = await topic.save();

    return _topic;
  }

  vote(){

  }
}

module.exports = Member;