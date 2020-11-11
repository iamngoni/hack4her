const Members = require("./../models/members");

class Member{
  /**
   * 
   * @param {String} firstName 
   * @param {String} middleName 
   * @param {String} surname 
   * @param {String} email 
   * @param {String} bio 
   * @param {String} occupation 
   * @param {Date} dateOfBirth 
   */
  constructor(
    firstName,
    middleName = "",
    surname,
    email,
    bio = "",
    occupation = "",
    dateOfBirth,
    password
  ){
    this.member = new Members();
    this.member.firstName = firstName;
    this.member.middleName = middleName;
    this.member.surname = surname;
    this.member.email = email;
    this.member.bio = bio;
    this.member.occupation = occupation;
    this.member.dateOfBirth = new Date(dateOfBirth);
    this.member.setPassword(password);
  };

  /**
   * Save url to uploaded user image
   * @param {String} path 
   */
  async addImage(path){
    this.member.image = path;
  }

  /**
   * Save / update the member details
   */
  async save(){
    try{
      await this.member.save();
      return;
    }catch(error){
      return new Error(error.message);
    }
  }
}

module.exports = Member;