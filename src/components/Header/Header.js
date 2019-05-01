import React from 'react';
import {
    Input
} from 'antd';

import Notification from './Notification';

export default class Header extends React.Component {
    render() {
        const Search = Input.Search;

        return (
            <div className="header">
                <div className="container">
                    <div className="logo">
                        <img src="/asset/images/book-logo.png" alt=""/>
                    </div>
                    <div className="search-form">
                        <Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            enterButton
                        />
                    </div>
                    <div className="avatar">
                        <img src="/asset/images/ava.jpeg" alt=""/>
                    </div>
                    <Notification></Notification>
                </div>
            </div>
        );
    }
}