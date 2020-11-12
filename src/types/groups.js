const Topics = require("./../models/topics");

class Group{
  /**
   * @param {MongooseDocument} group 
   */
  constructor(group){
    this.group = group;
  }

  async addMember(id){
    let members = this.group.members;
    if(!members.includes(id)){
      members.push(id);
    }else{
      throw new Error("Member is in group already");
    }
    this.group.members = members;
    let _group = await this.group.save();
    return _group;
  }

  /**
   * Get list of topics in a group
   */
  async topics(){
    let topics = await Topics.find({group: this.group._id});
    return topics;
  }

  /**
   * Get number of topics in a group
   */
  async numberOfTopics(){
    let topics = await Topics.find({group: this.group._id});
    return topics.length;
  }

  /**
   * Update group name
   * @param {String} name 
   */
  async changeName(name){
    this.group.name = name;
    let _group = await this.group.save();
    return _group;
  }

  /**
   * Update group description
   * @param {String} description 
   */
  async updateDescription(description){
    this.group.description = description;
    let _group = await this.group.save();
    return _group;
  }
}

module.exports = Group;