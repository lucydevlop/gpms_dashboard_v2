import React, { Fragment } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Input, Checkbox, message, Form } from 'antd';
import { siteName } from '@config/setting';
import { userStore } from '@store/userStore';
import { inject, observer } from 'mobx-react';
import './login.less';
import 'animate.css';
import { StoreKeyValue } from '@models/global';

interface LoginFormProps {
  handleError: Function;
  history: any;
  handleSuccess: Function;
}

interface IState {
  loading: boolean;
}

@inject('userStore')
@observer
class LoginForm extends React.Component<LoginFormProps, IState> {
  constructor(props: LoginFormProps) {
    super(props);
    this.state = { loading: false };

    this.handleError = this.handleError.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentDidMount() {
    this.setState(() => ({
      loading: false
    }));
  }
  // state = {
  //   loading: false
  // };
  public state: IState = {
    loading: false
  };

  handleError = () => {
    const { handleError: propsHandleError } = this.props;
    this.setState(() => ({
      loading: false
    }));
    propsHandleError();
  };

  handleSuccess = () => {
    const { handleSuccess: propsHandleSuccess } = this.props;
    propsHandleSuccess();
    // let history = useHistory();
    // history.push('/dashboard');
    // this.props.history.push('/dashboard');
  };

  handleLogin = () => {
    this.setState(() => ({
      loading: true
    }));
  };

  handleSubmit = (values: StoreKeyValue) => {
    // this.setState(() => ({
    //   loading: true
    // }));
    this.handleLogin();

    const { username, password } = values;
    return new Promise(() => {
      userStore.handleUserLogin(username, password).then((res) => {
        // console.log('handleSubmit', res);
        if (res) {
          message.success('login success');
          setTimeout(() => {
            this.handleSuccess();
          }, 800);
        } else {
          this.handleError();
        }
      });
    });
  };

  render() {
    return (
      <Fragment>
        <div className="loginTitle">
          {siteName === 'GL&T 주차 관제' ? (
            <React.Fragment>
              <span>GL&T </span> 주차관제
            </React.Fragment>
          ) : (
            siteName
          )}
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username: admin | guest"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password: 123"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>
                <span>Remember me</span>
              </Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              id="login_button"
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={this.state.loading}
            >
              Log in
            </Button>
            <span> Or </span>
            <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default LoginForm;
// export default inject('userStore')(LoginForm);
