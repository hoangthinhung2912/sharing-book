import Request from '../Request';
import PostNormalize from './Normalize';
import { comment } from 'postcss';

const PostRequest = {
  getListPost() {
    return Request().get('/api/v1/posts/4/').then(PostNormalize.getListPost);
  },
  getListSharePost() {
    return Request().get('/api/v1/posts/1/').then(PostNormalize.getListPost);
  },
  getListReviewPost() {
    return Request().get('/api/v1/posts/2/').then(PostNormalize.getListPost);
  },
  getListDonatePost() {
    return Request().get('/api/v1/posts/3/').then(PostNormalize.getListPost);
  },
  getListShareRecommendsPost(postType) {
    return Request().get('/api/v1/posts/' + postType +'/recommends').then(PostNormalize.recommendPost);
  },
  addPost(data) {
    return Request().postFormData('/api/v1/posts/' + data.get('post_type') + '/', data);
  },
  editPost(postId, data) {
    return Request().putFormData('/api/v1/posts/' + data.get('post_type') + '/' + postId + '/', data);
  },
  deletePost(postType, postId) {
    return Request().delete('/api/v1/posts/' + postType + '/' + postId + '/');
  },
  getCommentsByPostID(postId) {
    return Request().get('/api/v1/posts/' + postId + '/comments/').then(PostNormalize.getCommentsByPostID);
  },
  addComment(postId, data) {
    return Request().post('/api/v1/posts/' + postId + '/comments/', data);
  },
  editComment(postId, commentId, data) {
    return Request().put('/api/v1/posts/' + postId + '/comments/' + commentId +'/', data);
  },
  deleteComment(postId, commentId) {
    return Request().delete('/api/v1/posts/' + postId + '/comments/' + commentId + '/');
  },
  likePost(postId) {
    return Request().post('/api/v1/posts/' + postId + '/action/')
  },
  searchPost(postType, data) {
    const postData = {key: data};
    return Request().post('/api/v1/posts/' + postType + '/search/', postData).then(PostNormalize.searchPost);
  },
  searchWithTypePost(postType, data) {
    return Request().post('/api/v1/posts/' + postType + '/tags/', data).then(PostNormalize.searchPost);
  },
  getListDonation() {
    return Request().get('/api/v1/accounts/donations/');
  },
  registerBook(data) {
    return Request().postFormData('/api/v1/posts/register/', data);
  },
  recommendBook() {
    return Request().get('/api/v1/posts/books/').then(PostNormalize.getListPost);
  },
};

export default PostRequest;