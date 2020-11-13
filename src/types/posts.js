class Post{
  constructor(post){
    this.post = post;
  }

  async addComment(id){
    let comments = this.post.comments;
    comments.push(id);
    this.post.comments = comments;
    let _post = await this.post.save();
    return _post;
  }

  getComments(){
    return this.post.comments;
  }

  getNumberOfComments(){
    return this.post.comments.length;
  }
}

module.exports = Post;