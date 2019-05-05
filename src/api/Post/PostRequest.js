import Request from '../Request';
import PostNormalize from './Normalize';

const PostRequest = {
  getListPost() {
    return Request().get('/api/v1/posts').then(PostNormalize.getListPost);
  }
};

export default PostRequest;