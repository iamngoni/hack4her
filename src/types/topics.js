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
}

module.exports = Topic;