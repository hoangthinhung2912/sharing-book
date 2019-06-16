import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { PostActions } from '../../actions';
import { getListPost, getPostAppState, getListRecommend } from '../../reducers/post/select';

import { Skeleton, Empty } from 'antd';

import Header from '../../components/Header';
import Post from '../../components/Post';
import PostTags from './PostTags';
import PostBuilder from '../../components/PostBuilder/PostBuilder';
import PostRecommend from '../../components/Post/PostRecommend';
import EditProfile from '../../components/Post/EditProfile';

const mapStateToProps = (state) => {
	return {
    postAppState: getPostAppState(state),
    listPost: getListPost(state),
    listRecommend: getListRecommend(state),
    user: state.auth.userInfo,
	};
};

const mapDispatchToProps = {
  getListPost: PostActions.getListSharePost,
  getListRecommends: PostActions.getListShareRecommendsPost,
  addPost: PostActions.addPost,
  deletePost: PostActions.deletePost,
  changePostType: PostActions.changePostType,
  searchByTags: PostActions.searchWithPostType
};

export class Share extends React.Component {
  static propTypes = {
    getListPost: PropTypes.func,
    listPost: PropTypes.array,
    listRecommend: PropTypes.array,
    postAppState: PropTypes.object.isRequired,
  }

  static defaultProps = {
    getListPost: () => null,
    listPost: [],
    listRecommend: [],
  }

  componentDidMount() {
    this.props.getListPost();
    this.props.getListRecommends(1);
    this.props.changePostType(1);
  }

  onCreatePost = (data) => {
    const formData = new FormData();
    data.images.forEach(item => formData.append('images', item.originFileObj));
    formData.append('name', data.name);
    formData.append('content', data.content);
    formData.append('book_type', data.book_type);
    formData.append('post_type', 1);
    formData.append('location', data.location);
    formData.append('price', data.price);

    this.props.addPost(formData);
  }

  onDeletePost = (data) => {
    this.props.deletePost(data.post_type, data.id);
  }

  onSearchByTags = (data) => {
    this.props.searchByTags(1, data);
  }

  render() {
    return (
      <div className="home-wrap">
        <Header />
        <div className="home-container container">
          <div className="post-container">
            <div className="post-create-header">
              Tạo bài viết
            </div>
            <PostBuilder onPost={this.onCreatePost} type={1}/>
            <Skeleton className="post-skeleton" avatar paragraph={{ rows: 4 }} active loading={this.props.postAppState.loading}>
              <Choose>
                <When condition={this.props.listPost.length === 0}>
                  <Empty className="post-empty" />
                </When>
                <When condition={this.props.listPost.length && this.props.user !== null}>
                  {this.props.listPost.map(post => (
                    <Post 
                      key={post.id} 
                      post={post}
                      onDeletePost={this.onDeletePost} />
                  ))}
                </When>
              </Choose>
            </Skeleton>
          </div>
          <div className="tags right-tags">
            <div className="tags-wrap">
              <PostTags 
                onSearchByTags={this.onSearchByTags}  
              />
            </div>
            <div className="recommend-post-wrap">
              <div className="recommend-title">Bạn có thể thích: </div>
              {this.props.listRecommend.map(post => (
                <PostRecommend post={post}></PostRecommend>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Share);