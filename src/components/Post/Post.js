import React from 'react';
import PropTypes from 'prop-types';
import { PostRequest } from '../../api';
import PostDetail from './PostDetail';
import Comment from './Comment';
import Actions from './Actions';
import { connect } from "react-redux";

import { PostActions } from '../../actions';
import { getCommentByPostId } from '../../reducers/comment/select';
import { getUser } from '../../reducers/post/select.js';

const mapStateToProps = (state, props) => {
	return {
    comments: getCommentByPostId(props.post.id)(state),
    user: state.auth.userInfo
	};
};

const mapDispatchToProps = {
  getCommentsByPostID: PostActions.getCommentsByPostID,
  addComment: PostActions.addComment,
  editComment: PostActions.editComment,
  deleteComment: PostActions.deleteComment,
  likePost: PostActions.likePost,
  editPost: PostActions.editPost
};

export class Post extends React.Component {
  static propTypes = {
    comments: PropTypes.array,
    post: PropTypes.object,
  }

  static defaultProps = {
    comments: [],
    post: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      isShowComment: false,
    };
  }

  showComment = () => {
    // TODO: call API
    this.props.getCommentsByPostID(this.props.post.id);
    this.setState({
      isShowComment: !this.state.isShowComment,
    });
  }

  addComment = (content) => {
    this.props.addComment(this.props.post.id, {
      content
    });
  }

  editComment = (comment) => {
    this.props.editComment(this.props.post.id, comment.id, comment);
  }

  deleteComment = (comment) => {
    this.props.deleteComment(this.props.post.id, comment.id);
  }

  likePost = () => {
    this.props.likePost(this.props.post.id)
  }
  
  handleDeletePost = () => {
    this.props.onDeletePost(this.props.post);
  }

  editPost = (data) => {
    const formData = new FormData();
    data.images.forEach(item => formData.append('images', item.originFileObj));
    formData.append('content', data.content);
    formData.append('book_type', data.book_type);
    formData.append('removed_images', data.removed_images);
    formData.append('post_type', data.post_type); 

    this.props.editPost(this.props.post.id, formData);
  }

  render() {
    const { post } = this.props;

    return (
      <div className="post-wrap">
        <PostDetail
          userCreated={{
            id: post.user_id,
            avatar: post.user_avatar,
            name: post.user_name
          }}
          id={post.id}
          title={post.name}
          content={post.content}
          dateCreated={post.created}
          images={post.images}
          bookType={post.book_type_text}
          book_type={post.book_type}
          post_type={post.post_type}
          user={this.props.user}
          location={post.location}
          price={post.price}
          handleDeletePost={this.handleDeletePost}
          handleEditPost={this.editPost}
        />
        <Actions
          showComment={this.showComment}
          totalComment={post.total_comments}
          likes={post.likes}
          is_like_own={post.is_like_own}
          handleLikePost={this.likePost}
        />
        <If condition={this.state.isShowComment}>
          <div className="post-comment">
            <Comment 
              data={this.props.comments} 
              user={this.props.user}
              handleAddComment={this.addComment}
              handleEditComment={this.editComment}
              handleDeleteComment={this.deleteComment} />
          </div>
        </If>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);