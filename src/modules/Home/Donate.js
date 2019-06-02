import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { PostActions } from '../../actions';
import { getListPost, getPostAppState, getListDonation } from '../../reducers/post/select';

import { Skeleton, Empty } from 'antd';

import Header from '../../components/Header';
import Post from '../../components/Post';
import PostTags from './PostTags';
import PostBuilder from '../../components/PostBuilder/PostBuilder';
import Donator from '../../components/Post/Donator';

const mapStateToProps = (state) => {
  return {
    postAppState: getPostAppState(state),
    listPost: getListPost(state),
    listDonation: getListDonation(state),
  };
};

const mapDispatchToProps = {
  getListPost: PostActions.getListDonatePost,
  getListDonation: PostActions.getListDonation,
  addPost: PostActions.addPost,
  changePostType: PostActions.changePostType,
  searchByTags: PostActions.searchWithPostType
};

export class Donate extends React.Component {
  static propTypes = {
    getListPost: PropTypes.func,
    listPost: PropTypes.array,
    listDonation: PropTypes.array,
    postAppState: PropTypes.object.isRequired,
  }

  static defaultProps = {
    getListPost: () => null,
    listPost: [],
    listDonation: [],
  }

  componentDidMount() {
    this.props.getListPost();
    this.props.getListDonation();
    this.props.changePostType(3);
  }

  onCreatePost = (data) => {
    const formData = new FormData();
    formData.append('images', data.images[0].originFileObj);
    formData.append('content', data.content);
    formData.append('book_type', data.book_type);
    formData.append('post_type', 3);

    this.props.addPost(formData);
  }

  onSearchByTags = (data) => {
    this.props.searchByTags(3, data);
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
            <PostBuilder onPost={this.onCreatePost} type={3}/>
            <Skeleton className="post-skeleton" avatar paragraph={{ rows: 4 }} active loading={this.props.postAppState.loading}>
              <Choose>
                <When condition={this.props.listPost.length === 0}>
                  <Empty className="post-empty" />
                </When>
                <When condition={this.props.listPost.length}>
                  {this.props.listPost.map(post => (
                    <Post key={post.id} post={post} />
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
              <div className="recommend-title">Tổ chức quyên góp liên kết: </div>
              {this.props.listDonation.map(post => (
                <Donator post={post}></Donator>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donate);