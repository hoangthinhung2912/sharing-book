import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { PostActions } from '../../actions';
import { getListPost, getPostAppState } from '../../reducers/post/select';

import { Skeleton, Empty } from 'antd';

import Header from '../../components/Header';
import Post from '../../components/Post';
import PostTags from './PostTags';

const mapStateToProps = (state) => {
	return {
    postAppState: getPostAppState(state),
    listPost: getListPost(state),
	};
};

const mapDispatchToProps = {
  getListPost: PostActions.getListPost
};

class Home extends React.Component {
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
                <When condition={this.props.listPost.length}>
                    {this.props.listPost.map(post => (
                      <Post key={post.id} post={post} />
                    ))}
                </When>
              </Choose>
            </Skeleton>
          </div>
          <div className="tags">
            <PostTags />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);