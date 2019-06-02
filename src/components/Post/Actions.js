import React from 'react';
import {
  Icon
} from 'antd';

export default class Actions extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="post-action-info">
          <div className="action-info">
            <Icon className="action-icon" type="like" />
            <span>{this.props.likes}</span>
          </div>
          <a className="comment-info" onClick={this.props.showComment}>{this.props.totalComment} bình luận</a>
        </div>
        <div className="post-action">
          <div className={"like-btn " + (this.props.is_like_own ? 'liked' : '')} onClick={this.props.handleLikePost}>
            <Icon className="action-icon" type="like" />
            <span>Thích</span>
          </div>
          <div className="comment-btn" onClick={this.props.showComment}>
            <Icon type="message" />
            <span>Bình luận</span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
