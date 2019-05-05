import React from 'react';
import PropTypes from 'prop-types';

import PostImage from './PostImage';

export default class PostDetail extends React.Component {
  static propTypes = {
    userCreated: PropTypes.object.isRequired,
    dateCreated: PropTypes.string,
    content: PropTypes.string,
    images: PropTypes.array,
  }

  static defaultProps = {
    dateCreated: '',
    content: '',
    images: [],
  }

  get userAvatar() {
    return this.props.userCreated.avatar || '/asset/images/ava.jpeg';
  }

  render() {
    return (
      <React.Fragment>
        <div className="avatar">
          <div className="avatar-img">
            <img src={this.userAvatar} alt="avatar" />
          </div>
          <div className="avatar-info">
            <div className="info-name">{this.props.userCreated.name}</div>
            <div className="info-time">{this.props.dateCreated}</div>
          </div>
        </div>
        <div className="post-detail">
          <div className="content">{this.props.content}</div>
          <div className="image">
            <PostImage images={this.props.images} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
