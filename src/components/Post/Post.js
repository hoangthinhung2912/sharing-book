import React from 'react';
import {
    Icon
} from 'antd';

import Comment from './Comment';

export default class Post extends React.Component {
    render() {
        return (
            <div className="post-wrap">
                <div className="avatar">
                    <div className="avatar-img">
                        <img src="/asset/images/ava.jpeg" alt="" />
                    </div>
                    <div className="avatar-info">
                        <div className="info-name">KIKI</div>
                        <div className="info-time">22-04-2019</div>
                    </div>
                </div>
                <div className="post-detail">
                    <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus mi,
                        placerat non euismod eu, maximus rhoncus est. Fusce a mi nec mi rhoncus auctor.
                         Curabitur a iaculis ipsum. Mauris laoreet enim eu placerat condimentum.
                         Ut suscipit erat at viverra dapibus. Pellentesque luctus lorem metus,
                         ut dapibus massa tempor ut. Ut pharetra ac magna ut egestas.
                    </div>
                    <div className="image">

                    </div>
                </div>
                <div className="post-action-info">
                    <div className="action-info">
                        <Icon className="action-icon" type="like" />
                        <span>12</span>
                        <Icon className="action-icon" type="dislike" />
                        <span>1</span>
                    </div>
                    <div className="comment-info">
                        20 bình luận
                    </div>
                </div>
                <div className="post-action">
                    <div className="like-btn">
                        <Icon className="action-icon" type="like" /> Thích
                    </div>
                    <div className="comment-btn">
                        <Icon type="message" /> Bình luận
                    </div>
                </div>
                <div className="post-comment">
                    <Comment></Comment>
                </div>
            </div>
        );
    }
}   