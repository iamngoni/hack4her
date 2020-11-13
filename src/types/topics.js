class Topic{
  constructor(topic){
    this.topic = topic;
  }

  async addPost(id){
    let posts = this.topic.posts;
    if(!posts.includes(id)){
      posts.push(id);
    }else{
      throw new Error("Post already exists");
    }

    let _topic = await this.topic.save();
    return _topic;
  }

  getPosts(){
    return this.topic.posts;
  }

  async addVote(id){
    let votes = this.topic.votes;
    if(votes.includes(id)){
      throw new Error("Cannot vote multiple times on the same topic");
    }

    votes.push(id);
    this.topic.votes = votes;
    let _topic = await this.topic.save();
    return _topic;
  }

  votesCount(){
    return this.topic.votes.length;
  }
}

module.exports = Topic;