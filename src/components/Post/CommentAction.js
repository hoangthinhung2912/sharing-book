import React from 'react';
import {
    Menu, Dropdown, Icon
} from 'antd';

export default class CommentAction extends React.Component {
    renderMenu = () => {
        return (
            <Menu>
                <Menu.Item onClick={this.props.toggleEdit}>
                    <span>Edit</span>
                </Menu.Item>
                <Menu.Item onClick={this.props.onDelete}>
                    <span>Delete</span>
                </Menu.Item>
            </Menu>
        );
    }

    render() {
        return (
            <Dropdown overlay={this.renderMenu()} trigger={['click']}>
                <div className="comment-action">
                    <Icon type="ellipsis" />
                </div>
            </Dropdown>
        );
    }
}
