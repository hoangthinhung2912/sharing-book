import React from 'react';
import {
  Input
} from 'antd';

import Notification from './Notification';
import User from './User';

export default class Header extends React.Component {
  render() {
    const Search = Input.Search;

    return (
      <div className="header">
        <div className="container">
          <div className="logo">
            <img src="/asset/images/book-logo.png" alt="" />
          </div>
          <div className="search-form">
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              enterButton
            />
          </div>
          <User />
          <Notification />
        </div>
      </div>
    );
  }
}