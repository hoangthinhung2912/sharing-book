import React from 'react';
import {
  Input, Button
} from 'antd';
import CommentItem from './CommentItem';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.$ref = {
      comment: React.createRef(),
    };
    this.state = {
      inputComment: ''
    }
  }

  componentDidMount() {
    this.$ref.comment.current.focus();
  }

  onAddComment = () => {
    this.props.handleAddComment(this.state.inputComment);
    this.setState({
      inputComment: ''
    })
  }

  handleInputCommentChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        {this.props.data.map(item => (
          <CommentItem 
            handleEditComment={this.props.handleEditComment} 
            item={item} 
            user={this.props.user} 
            key={item.uniqueId} 
            handleDeleteComment={this.props.handleDeleteComment} />
        ))}
        <div className="add-comment">
          <div className="avatar">
            <img src={`${process.env.REACT_APP_IMAGE_HOST}${this.props.user.user_avatar}`} alt="" />
          </div>
          <Input
            ref={this.$ref.comment} 
            value={this.state.inputComment} 
            className="input"
            onChange={this.handleInputCommentChange}
            onPressEnter={this.onAddComment}
            name="inputComment"
            placeholder="Nhập bình luận" />
          <div>
            <Button onClick={this.onAddComment}>Gửi</Button>
          </div>
        </div>
      </div>
    );
  }
}
