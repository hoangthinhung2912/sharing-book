import React from 'react';
import {
  Menu, Dropdown, Icon
} from 'antd';

export default class Notification extends React.Component {
  renderMenu = () => {
    return (
      <Menu className="notification-items"> 
        {this.props.notifications.map(notification => (
          <Menu.Item 
            key={notification.id} 
            className={notification.seen ? '': 'seen'}
            onClick={() => this.props.handleSeenNotification(notification.id, notification.seen)}
          >
            <a href={`http://localhost:3000/home#${notification.post}`}>{notification.content}</a>
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  render() {
    return (
      <Dropdown overlay={this.renderMenu()} trigger={['click']}>
        <div className="notification">
          <Icon type="bell" />
          <span>{this.props.notifications.length}</span>
        </div>
      </Dropdown>
    );
  }
}
