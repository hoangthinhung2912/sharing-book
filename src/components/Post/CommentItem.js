import React from 'react';
import {
    Input, Icon
} from 'antd';
import CommentAction from './CommentAction';

export default class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentComment: props.item.content,
            isEdit: false
        }

        this.isPristine = true;
    }

    toggleEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    handleInputCommentChange = (e) => {
        this.isPristine = false;
        this.setState({
            [e.target.name]: e.target.value
          });
    }

    onEditComment = () => {
        if (!this.isPristine) {
            const comment = {
                ...this.props.item,
                content: this.state.currentComment
            }
            this.props.handleEditComment(comment);
        }

        this.setState({
            isEdit: false
        });
        this.isPristine = true;
    }

    onDeleteComment = () => {
        this.props.handleDeleteComment(this.props.item);
    }

    render() {
        const item = this.props.item;
        return (
            <div className="comment-item">
                <div className="avatar">
                    <img src={`${process.env.REACT_APP_IMAGE_HOST}${item.user_avatar}`} alt="" />
                    <span>{item.user_name}</span>
                </div>
                <If condition={!this.state.isEdit}>
                    <div className="comment">{item.content}</div>
                </If>
                <If condition={this.state.isEdit}>
                    <Input
                        value={this.state.currentComment}
                        className="input"
                        onChange={this.handleInputCommentChange}
                        onPressEnter={this.onEditComment}
                        name="currentComment"
                        addonAfter={<Icon type='close' onClick={this.toggleEdit}></Icon>} />
                </If>
                <If condition={item.user_id === this.props.user.user_id}>
                    <CommentAction 
                        toggleEdit={this.toggleEdit} 
                        onDelete={this.onDeleteComment} />
                </If>
            </div>
        );
    }
}
