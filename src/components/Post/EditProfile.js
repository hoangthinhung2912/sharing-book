import React from 'react';
import { connect } from "react-redux";

import { Button, Input, Icon, Upload, message } from 'antd';

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
      isChangePass: false,
      isChangeUserName: false,
      isChangeEmail: false,
      loading: false,
      imageUrl: null,
      image: null,
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
    this.props.onEditProfile(this.state);
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const imageUrl = this.state.imageUrl;
    return (
      <React.Fragment>
        <div className="edit-profile">
          <div className="title">Chỉnh sửa hồ sơ: </div>
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
          <div className="field">
            <Input
              name='user_name'
              value={this.state.username}
              disabled={!this.state.isChangeUserName}
              onChange={this.onChange}
            />
            <Icon type="edit" className="icon" onClick={this.onChangeUserNameToggle}/>
          </div>
          <div className="field">
            <Input
              name='email'
              value={this.state.email}
              disabled= 'true'
            />
            <Icon type="edit" className="icon" onClick={this.onChangeEmailToggle} />
          </div>
          <If condition={this.state.isChangePass}>
            <div className="field">
              <Input
                name='old_password'
                type='password'
                onChange={this.onChange}
              />
              <Icon type="edit" className="icon active" />
            </div>
            <div className="field">
              <Input
                type='password'
                name='new_password1'
                onChange={this.onChange}
              />
              <Icon type="edit" className="icon active" />
            </div>
            <div className="field">
              <Input
                type='password'
                name='new_password2'
                onChange={this.onChange}
              />
              <Icon type="edit" className="icon active" />
            </div>
          </If>
          <div className='save-button'>
            <div onClick={this.onChangePassToggle} className="change-action">
              Thay đổi mật khẩu
            </div>
            <div>
              <Button type='default' onClick={this.handleEditProfile}>
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
