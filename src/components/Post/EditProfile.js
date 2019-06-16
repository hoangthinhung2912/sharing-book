import React from 'react';
import { connect } from "react-redux";
import { compose, equals } from 'ramda';

import { PostActions } from '../../actions';

import { Button, Input, Icon, Upload, Form, notification } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.userInfo
  };
};

const mapDispatchToProps = {
  registerBook: PostActions.registerBook
};


export class EditProfile extends React.Component {
  static defaultProps = {
    post_type: 1,
    book_type: 1,
    onRemove: () => null,
  }

  constructor(props) {
    super(props);

    this.state = {
      isProfile: true,
      isRegister: false,
      isChangePass: false,
      isChangeUserName: false,
      isChangeEmail: false,
      loading: false,
      imageUrl: null,
      image: null,
      bookName: '',
      username: '',
      old_password: '',
      new_password1: '',
      new_password2: '',
    };
  }

  componentDidMount() {
    this.setState({
      imageUrl: process.env.REACT_APP_IMAGE_HOST + this.props.user.user_avatar,
    });
    this.setState({
      username: this.props.user.user_name,
      email: this.props.user.email
    });
  }

  handleTextareaChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleLocationChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeImages = (data) => {
    this.setState({
      images: data
    });
  }

  onChangeTag = (data) => {
    this.setState({
      book_type: data
    });
  }

  handleBuildPost = () => {
    this.props.onPost({
      ...this.state
    });
    this.setState({
      username: '',
      email: '',
    })
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        image: info.file.originFileObj
      }),
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
    }
  };

  onChangePassToggle = () => {
    this.setState({
      isChangePass: !this.state.isChangePass,
    });
  }

  onChangeUserNameToggle = () => {
    this.setState({
      isChangeUserName: !this.state.isChangeUserName,
    });
  }

  onChangeProfileToggle = () => {
    this.setState({
      isRegister: this.state.isProfile,
      isProfile: !this.state.isProfile,
    });
  }

  onChangeRegisterToggle = () => {
    this.setState({
      isProfile: this.state.isRegister,
      isRegister: !this.state.isRegister,
    });
  }

  onChangeEmailToggle = () => {
    this.setState({
      isChangeEmail: !this.state.isChangeEmail,
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleEditProfile = () => {
    this.setState({
      isChangeUserName: false,
    });
    this.props.onEditProfile(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handleEditProfile();
        this.props.form.resetFields();
      }
    });
  }

  onRegister = () => {
    this.props.registerBook({'name': this.state.bookName});
    this.props.onGetBookRecommend();
    this.setState({
      bookName: '',
    });
    this.openNotification();
  }

  openNotification = () => {
    notification.open({
      message: 'Thông báo',
      description:
        'Bạn đã gửi thành công yêu cầu cầu nhậ thông báo sách cho hệ thống.',
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const imageUrl = this.state.imageUrl;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div className="edit-profile">
          <div className="title">
            <span
              onClick={this.onChangeProfileToggle}
              className={this.state.isProfile ? 'active link' : 'link'}>
              Chỉnh sửa hồ sơ
            </span> | <span> </span>
            <span
              onClick={this.onChangeRegisterToggle}
              className={this.state.isRegister ? 'active link' : 'link'}>
              Đăng kí nhận thông tin sách
            </span>
          </div>
          <If condition={this.state.isRegister}>
            <div className="field mt-3">
              <Input
                name='bookName'
                placeholder="Nhập tên sách"
                value={this.state.bookName}
                onChange={this.onChange}
              />
              <div>
                <Button 
                  onClick={this.onRegister}
                  disabled={this.state.bookName === ''}>
                   Gửi
                </Button>
              </div>
            </div>
          </If>
          <If condition={this.state.isProfile}>
            <div className='avatar'>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
              </Upload>
            </div>
            <Form className="profile-form" onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Bạn phải nhập tên người dùng!' }],
                  initialValue: this.state.username
                })(
                  <div className="field">
                    <Input
                      name='username'
                      placeholder="Nhập tên của bạn"
                      value={this.state.username}
                      disabled={!this.state.isChangeUserName}
                      onChange={this.onChange}
                    />
                    <Icon type="edit" className="icon" onClick={this.onChangeUserNameToggle} />
                  </div>
                )}
              </Form.Item>
              <div className="field">
                <Input
                  name='email'
                  value={this.state.email}
                  disabled
                />
                <Icon type="edit" className="icon" onClick={this.onChangeEmailToggle} />
              </div>
              <If condition={this.state.isChangePass}>
                <Form.Item>
                  {getFieldDecorator('old_password', {
                    rules: [{ required: true, message: 'Bạn phải nhập mật khẩu cũ!' }],
                  })(
                    <div className="field">
                      <Input
                        name='old_password'
                        type='password'
                        placeholder="Nhập mật khẩu cũ của bạn"
                        onChange={this.onChange}
                      />
                      <Icon type="edit" className="icon active" />
                    </div>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('new_password1', {
                    rules: [{ required: true, message: 'Bạn phải nhập mật khẩu mới!' }],
                  })(
                    <div className="field">
                      <Input
                        type='password'
                        name='new_password1'
                        placeholder="Nhập mật khẩu mới của bạn"
                        onChange={this.onChange}
                      />
                      <Icon type="edit" className="icon active" />
                    </div>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('new_password2', {
                    rules: [{ required: true, message: 'Bạn phải nhập lại mật khẩu mới!' }],
                  })(
                    <div className="field">
                      <Input
                        type='password'
                        name='new_password2'
                        placeholder="Nhập lại mật khẩu mới của bạn"
                        onChange={this.onChange}
                      />
                      <Icon type="edit" className="icon active" />
                    </div>
                  )}
                </Form.Item>
              </If>
              <div className='save-button'>
                <div onClick={this.onChangePassToggle} className="change-action">
                  Thay đổi mật khẩu
              </div>
                <div>
                  <Button type='default' htmlType="submit">
                    Lưu
                </Button>
                </div>
              </div>
            </Form>
          </If>
        </div>
      </React.Fragment>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create({ name: 'profile-form' })
)(EditProfile);
