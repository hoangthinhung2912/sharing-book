import React from 'react';
import {
  Menu, Dropdown
} from 'antd';

export default class User extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className="user-name">{this.props.user.user_name}</div>
        <div className="avatar">
          <img src={`${process.env.REACT_APP_IMAGE_HOST}${this.props.user.user_avatar}`} alt="" />
        </div>
      </React.Fragment>
    );
  }
}
