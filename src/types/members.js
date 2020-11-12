const Groups = require("./../models/groups");
const Topics = require("../models/topics");
const Requestx = require("../models/requestx");
const mongoose = require("mongoose");

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

  async requestGroupEntry(groupId){
    console.log(groupId);
    let rx = await Requestx.find({member: this.member._id, group: groupId, approved: false});

    if(rx.length > 0){
      throw new Error("Request was posted is still waiting for approval");
    }

    let request = new Requestx({
      member: this.member._id,
      group: groupId
    });

    let _request = await request.save();
    return _request;
  }

  async exitGroup(){

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