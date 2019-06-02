import React from 'react';
import PropTypes from 'prop-types';

export default class Donator extends React.Component {
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
                <div className="post-wrap donation-wrap">
                    <div className="post-header">
                        <div className="avatar">
                            <div className="avatar-img">
                                <img src={`${process.env.REACT_APP_IMAGE_HOST}${this.props.post.donation_avatar}`} alt="avatar" />
                            </div>
                            <div className="avatar-info">
                                <div className="info-name">{this.props.post.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="post-detail">
                        <div className="content">{this.props.post.description}</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
