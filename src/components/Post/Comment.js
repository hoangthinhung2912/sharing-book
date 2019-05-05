import React from 'react';
import {
  Input, Button
} from 'antd';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.$ref = {
      comment: React.createRef(),
    };
  }

  componentDidMount() {
    this.$ref.comment.current.focus();
  }

  render() {
    return (
      <div>
        <div className="comment-item">
          <div className="avatar">
            <img src="/asset/images/ava.jpeg" alt="" />
            <span>KIKI</span>
          </div>
          <div className="comment">KIKI an cut oi</div>
        </div>
        <div className="comment-item">
          <div className="avatar">
            <img src="/asset/images/ava.jpeg" alt="" />
            <span>POPO</span>
          </div>
          <div className="comment">KIKI an cut oi cua em oi</div>
        </div>
        <div className="add-comment">
          <div className="avatar">
            <img src="/asset/images/ava.jpeg" alt="" />
          </div>
          <Input ref={this.$ref.comment} className="input" placeholder="Nhập bình luận"></Input>
          <div>
            <Button>Gửi</Button>
          </div>
        </div>
      </div>
    );
  }
}
