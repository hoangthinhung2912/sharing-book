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

const mapStateToProps = (state) => {
  return {
    postAppState: getPostAppState(state),
    listPost: getListPost(state),
    listRecommend: getListRecommend(state),
  };
};

const mapDispatchToProps = {
  getListPost: PostActions.getListReviewPost,
  getListRecommends: PostActions.getListShareRecommendsPost,
  deletePost: PostActions.deletePost,
  addPost: PostActions.addPost,
  changePostType: PostActions.changePostType,
  searchByTags: PostActions.searchWithPostType
};

export class Review extends React.Component {
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
    this.props.getListRecommends(2);
    this.props.changePostType(2);
  }

  onCreatePost = (data) => {
    const formData = new FormData();
    formData.append('images', data.images[0].originFileObj);
    formData.append('content', data.content);
    formData.append('book_type', data.book_type);
    formData.append('post_type', 2);

    this.props.addPost(formData);
  }

  onSearchByTags = (data) => {
    this.props.searchByTags(2, data);
  }

  onDeletePost = (data) => {
    this.props.deletePost(data.post_type, data.id);
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
            <PostBuilder onPost={this.onCreatePost} />
            <Skeleton className="post-skeleton" avatar paragraph={{ rows: 4 }} active loading={this.props.postAppState.loading}>
              <Choose>
                <When condition={this.props.listPost.length === 0}>
                  <Empty className="post-empty" />
                </When>
                <When condition={this.props.listPost.length}>
                  {this.props.listPost.map(post => (
                    <Post key={post.id} post={post} onDeletePost={this.onDeletePost}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Review);