import React from 'react';
import PropTypes from 'prop-types';

import PostImage from './PostImage';
import PostAction from './PostAction';

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

  get postEditData() {
    return {
      id: this.props.id,
      title: this.props.title,
      content: this.props.content,
      images: this.transformImagesData(this.props.images),
      book_type: this.props.book_type,
      post_type: this.props.post_type,
      location: this.props.location,
      price: this.props.price,
      is_sold: this.props.is_sold,
      name: this.props.name
    };
  }

  transformImagesData = (images) => {
    return images.map(url => ({
      uid: Math.random() + url,
      name: url,
      status: 'remove',
      url: `${process.env.REACT_APP_IMAGE_HOST}${url}`,
      path: url,
      fromServer: true
    }));
  }

  render() {
    return (
      <React.Fragment>
        <div className="post-header">
          <div className="avatar">
            <div className="avatar-img">
              <img src={`${process.env.REACT_APP_IMAGE_HOST}${this.props.userCreated.avatar}`} alt="avatar" />
            </div>
            <div className="avatar-info">
              <div className="info-name">{this.props.userCreated.name}</div>
              <div className="info-time">{new Date(this.props.dateCreated).toLocaleDateString("en-US")}</div>
            </div>
          </div>
          <div className="book-type">
            <span>{this.props.bookType}</span>
            <If condition={this.props.userCreated.id === this.props.user.user_id}>
              <PostAction
                post={this.postEditData}
                toggleEdit={this.props.handleEditPost}
                onDelete={this.props.handleDeletePost}
                onMarkSold={this.props.handleMarkSold}
              />
            </If>
          </div>
        </div>
        <div className="post-detail">
          <If condition={this.props.post_type === 1 & this.props.is_sold}>
            <div className='location'>
              <span className="sold">Đã hết</span>
            </div>
          </If>
          <If condition={this.props.post_type === 1 & !this.props.is_sold}>
            <div className='location'>
              <span className="sold">Vẫn còn</span>
            </div>
          </If>
          <If condition={this.props.post_type === 1}>
            <div className='location'>
              <span>Sách:</span> {this.props.name}
            </div>
          </If>
          <If condition={this.props.post_type === 1}>
            <div className='location'>
              <span>Giá:</span> {this.props.price} VNĐ
            </div>
          </If>
          <If condition={this.props.post_type === 1 || this.props.post_type === 3}>
            <div className='location'>
              <span>Địa chỉ:</span> {this.props.location}
            </div>
          </If>
          <div className="content">
            {this.props.content}
          </div>
          <div className="image">
            <PostImage images={this.props.images} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
