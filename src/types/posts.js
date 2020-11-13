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
}

module.exports = Post;