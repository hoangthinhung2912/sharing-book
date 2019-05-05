import React from 'react';
import {
  Menu, Dropdown
} from 'antd';

export default class User extends React.Component {
  renderMenu = () => {
    return (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">Profile</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">Logout</a>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Dropdown overlay={this.renderMenu()} trigger={['click']}>
        <div className="avatar">
          <img src="/asset/images/ava.jpeg" alt="" />
        </div>
      </Dropdown>
    );
  }
}
