import React from 'react';
import { connect } from "react-redux";

import {
  Input, Icon
} from 'antd';

import { PostActions, AuthActions } from '../../actions';

import Notification from './Notification';
import User from './User';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { getPostType } from '../../reducers/post/select';

const mapStateToProps = (state) => {
  return {
    postType: getPostType(state),
    user: state.auth.userInfo,
  };
};

const mapDispatchToProps = {
  search: PostActions.searchPost,
  logout: AuthActions.logout,
};

export class Header extends React.Component {
  test = (match, location) => {
    if (!match) {
      return false;
    } else {
      return true;
    }
  }

  onSearch = (value) => {
    this.props.search(this.props.postType, value);
  }

  logout = () => {
    this.props.logout();
  }

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
              onSearch={value => this.onSearch(value)}
              enterButton
            />
          </div>
          <div className='bar-item'><NavLink to='/share' isActive={this.test} >Trao đổi</NavLink></div>
          <div className='bar-item'><NavLink to='/review' isActive={this.test} >Đánh giá</NavLink></div>
          <div className='bar-item'><NavLink to='/donate' isActive={this.test} >Quyên góp</NavLink></div>
          <If condition={this.props.user !== null}>
            <div className="user-wrap">
              <NavLink to='/home' isActive={this.test} ><User user={this.props.user} /></NavLink>
            </div>
          </If>
          <Notification />
          <div className="logout-icon">
            <Icon type="logout" onClick={this.logout}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);