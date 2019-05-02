import React from 'react';
import { connect } from "react-redux";
import { compose, equals } from 'ramda';
import { AuthActions } from '../../actions';
import { getAuthAppState } from '../../reducers/auth/select';
import {
  Form, Input, Button
} from 'antd';

const mapStateToProps = (state) => {
	return {
    authAppState: getAuthAppState(state),
	}
};

const mapDispatchToProps = {
  register: AuthActions.register
};

class Register extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  componentDidUpdate(prevProps) {
    const { error, isLogged } = this.props.authAppState;

    if (!equals(error, prevProps.authAppState.error) && error) {
      const formFields = Object.keys(error).reduce((acc, key) => {
        return {
          ...acc,
          [key]: {
            value: this.props.form.getFieldValue(key),
            errors: error[key].map(Error)
          }
        }
      }, {});

      this.props.form.setFields(formFields)
    }

    if (!equals(isLogged, prevProps.authAppState.isLogged) && isLogged) {
      this.props.history.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.register(values);
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password1')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['password2'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className="register-form">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label={(
              <span>
                Tên đăng nhập
              </span>
            )}
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Nhập tên đăng nhập của bạn!', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Email không hợp lệ!',
              }, {
                required: true, message: 'Nhập email của bạn!',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="Mật khẩu">
            {getFieldDecorator('password1', {
              rules: [{
                required: true, message: 'Nhập mật khẩu của bạn!',
              }, {
                min: 8, message: "Mật khẩu phải dài ít nhất 8 ký tự!"
              },{
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu">
            {getFieldDecorator('password2', {
              rules: [{
                required: true, message: 'Nhập lại mật khẩu của bạn!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout} className="form-action">
            <Button type="primary" htmlType="submit" className="register-btn">Đăng kí</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create({ name: 'register_form' })
)(Register);
