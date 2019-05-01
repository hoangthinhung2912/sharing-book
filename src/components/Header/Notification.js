import React from 'react';
import {
    Menu, Dropdown, Icon
} from 'antd';

export default class Notification extends React.Component {
    renderMenu = () => {
        return (
            <Menu>
                <Menu.Item key="0">
                    <a href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        return (
            <Dropdown overlay={this.renderMenu()} trigger={['click']}>
                <div className="notification">
                        <Icon type="bell" />
                        <span>12</span>
                    </div>
            </Dropdown> 
        )
    }
}
