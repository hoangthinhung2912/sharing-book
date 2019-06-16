import React from 'react';
import {
    Menu, Dropdown, Icon, Modal
} from 'antd';
import PostEditModal from '../../modals/PostEditModal';

const confirm = Modal.confirm;

export default class PostAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    showDeleteConfirm = () => {
        confirm({
            title: 'Bạn có muốn xóa bài viết này không?',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: this.props.onDelete,
        });
    }

    handelMarkSold = () => {
        this.props.onMarkSold(1, !this.props.post.is_sold);
    }

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    onEdit = () => {
        this.setState({
            visible: true
        });
    }

    renderMenu = () => {
        return (
            <Menu>
                <Menu.Item onClick={this.onEdit}>
                    <span>Chỉnh sửa</span>
                </Menu.Item>
                <Menu.Item onClick={this.showDeleteConfirm}>
                    <span>Xóa</span>
                </Menu.Item>
                <If condition={!this.props.post.is_sold & this.props.post.post_type === 1}>
                    <Menu.Item onClick={this.handelMarkSold}>
                        <span>Đánh dấu là đã bán</span>
                    </Menu.Item>
                </If>
                <If condition={this.props.post.is_sold & this.props.post.post_type === 1}>
                    <Menu.Item onClick={this.handelMarkSold}>
                        <span>Đánh dấu là chưa bán</span>
                    </Menu.Item>
                </If>
            </Menu>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Dropdown overlay={this.renderMenu()} trigger={['click']}>
                    <Icon type="more" />
                </Dropdown>
                <Modal
                    title='Chỉnh sửa bài viết'
                    visible={this.state.visible}
                    width="715px"
                    footer={null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                >
                    <PostEditModal 
                        closeModal={this.handleCancel} 
                        post={this.props.post}
                        handleEdit={this.props.toggleEdit}
                    />
                </Modal>
            </React.Fragment>
        );
    }
}
