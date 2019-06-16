import React from 'react';
import PropTypes from 'prop-types';

export default class PostRecommend extends React.Component {
    static propTypes = {
        // userCreated: PropTypes.object.isRequired,
        dateCreated: PropTypes.string,
        content: PropTypes.string
    }

    get userAvatar() {
        return this.props.post.user_avatar || '/asset/images/ava.jpeg';
    }

    render() {
        return (
            <React.Fragment>
                <div className="post-wrap recommend-wrap">
                    <a href={`#${this.props.post.id}`}>
                        <div className="post-header">
                            <div className="avatar">
                                <div className="avatar-img">
                                    <img src={`${process.env.REACT_APP_IMAGE_HOST}${this.userAvatar}`} alt="avatar" />
                                </div>
                                <div className="avatar-info">
                                    <div className="info-name">{this.props.post.user_name}</div>
                                    <div className="info-time">{new Date(this.props.post.created).toLocaleDateString("en-US")}</div>
                                </div>
                            </div>
                            <div className="book-type">
                                <span>{this.props.post.book_type_text}</span>
                            </div>
                        </div>
                        <If condition={this.props.post.post_type === 1}>
                            <div className="price">
                                <b>Giá: </b>{this.props.post.price} VNĐ
                            </div>
                            <div className="post-detail">
                                <div className="content">{this.props.post.name}</div>
                            </div>
                        </If>
                        <If condition={this.props.post.post_type !== 1}>
                            <div className="post-detail">
                                <div className="content">{this.props.post.content}</div>
                            </div>
                        </If>
                    </a>
                </div>
            </React.Fragment>
        );
    }
}
