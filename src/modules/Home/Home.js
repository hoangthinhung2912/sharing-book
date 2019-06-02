import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { PostActions, AuthActions } from '../../actions';
import { getListPost, getPostAppState } from '../../reducers/post/select';

import { Skeleton, Empty } from 'antd';

import Header from '../../components/Header';
import Post from '../../components/Post';
import PostTags from './PostTags';
import EditProfile from '../../components/Post/EditProfile';

const mapStateToProps = (state) => {
  return {
    postAppState: getPostAppState(state),
    listPost: getListPost(state),
    user: state.auth.userInfo,
  };
};

const mapDispatchToProps = {
  getListPost: PostActions.getListPost,
  deletePost: PostActions.deletePost,
  searchByTags: PostActions.searchWithPostType,
  editProfile: PostActions.editProfile,
  editUser: AuthActions.editUser,
  changePassword: AuthActions.changePassword,
};

export class Home extends React.Component {
  static propTypes = {
    getListPost: PropTypes.func,
    listPost: PropTypes.array,
    postAppState: PropTypes.object.isRequired,
  }

  static defaultProps = {
    getListPost: () => null,
    listPost: [],
  }

  componentDidMount() {
    this.props.getListPost();
  }

  onDeletePost = (data) => {
    this.props.deletePost(data.post_type, data.id);
  }

  onSearchByTags = (data) => {
    this.props.searchByTags(4, data);
  }

  onEditProfile = (data) => {
    if (data.image) {
      const formData = new FormData();
      formData.append('images', data.image);
      this.props.editProfile(this.props.user.id, formData);
    }
    if (data.username){
      this.props.editUser({ 'username': data.username });
    }
    if (data.old_password) {
      this.props.changePassword({
        'old_password': data.old_password,
        'new_password1': data.new_password1,
        'new_password2': data.new_password2
      });
    }
  }

  render() {
    return (
      <div className="home-wrap">
        <Header />
        <div className="home-container container">
          <div className="post-container">
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
            <If condition={this.props.user !== null}>
              <EditProfile onEditProfile={this.onEditProfile}></EditProfile>
            </If>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);