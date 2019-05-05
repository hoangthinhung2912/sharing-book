const PostModel = {
  create(data) {
    return Object.assign(Object.create(this), {
      data
    });
  }
};

export default PostModel;