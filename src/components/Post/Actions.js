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
            <span>12</span>
            <Icon className="action-icon" type="dislike" />
            <span>1</span>
          </div>
          <a className="comment-info" onClick={this.props.showComment}>20 bình luận</a>
        </div>
        <div className="post-action">
          <div className="like-btn">
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
