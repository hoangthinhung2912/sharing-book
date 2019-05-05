import React from 'react';
import { connect } from "react-redux";
import { compose, equals } from 'ramda';
import { AuthActions } from '../../actions';
import { getAuthAppState } from '../../reducers/auth/select';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
	return {
    authAppState: getAuthAppState(state),
	};
};

const mapDispatchToProps = {
  login: AuthActions.login
};

class Login extends React.Component {
  componentDidUpdate(prevProps) {
    const { error, isLogged } = this.props.authAppState;

    if (!equals(error, prevProps.authAppState.error) && error && error.non_field_errors) {
      this.props.form.setFields({
        username: {
          value: this.props.form.getFieldValue('username'),
          errors: error.non_field_errors.map(Error)
        }
      });
    }

    if (!equals(isLogged, prevProps.authAppState.isLogged) && isLogged) {
      this.props.history.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create({ name: 'login_form' })
)(Login);
