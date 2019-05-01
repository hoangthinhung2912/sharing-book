import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-form">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Nhập tên đăng nhập của bạn!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tên đăng nhập" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Nhập mật khẩu của bạn!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mật khẩu" />
            )}
          </Form.Item>
          <Form.Item>
            <div>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox className="remember-password">Nhớ mật khẩu</Checkbox>
              )}
              <a className="login-form-forgot" href="hhh">Quên mật khẩu</a>
            </div>

            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
            </Button>
            Or <Link to="/register">Đăng kí ngay!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'login_form' })(Login);
