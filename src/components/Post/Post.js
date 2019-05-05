import React from 'react';
import PropTypes from 'prop-types';

import PostDetail from './PostDetail';
import Comment from './Comment';
import Actions from './Actions';

export default class PostItem extends React.Component {
  static propTypes = {
    post: PropTypes.object,
  }

  static defaultProps = {
    post: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      isShowComment: false,
    };
  }

  showComment = () => {
    this.setState({
      isShowComment: true,
    });
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
          title={post.name}
          content={post.content}
          dateCreated={post.created}
          images={post.images}
        />
        <Actions
          showComment={this.showComment}
        />
        <If condition={this.state.isShowComment}>
          <div className="post-comment">
            <Comment></Comment>
          </div>
        </If>
      </div>
    );
  }
}