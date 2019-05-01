import React from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';
import {  } from 'antd';

export default class Home extends React.Component {
    render() {
        return (
            <div className="home-wrap">
                <Header></Header>
                <div className="container">
                    <Post></Post> 
                </div>
            </div>
        );
    }
}