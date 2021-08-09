import React, { useState } from 'react';
import { Alert } from 'antd';
import LoginForm from './LoginForm';
import './login.less';
import 'animate.css';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';

interface IProps {
  history: any;
}

interface IState {
  apError: boolean;
  shake: boolean;
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      apError: false,
      shake: false
    };

    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleSuccess = () => {
    this.props.history.push('/dashboard');
  };

  handleError = () => {
    this.setState(() => ({ apError: true, shake: true }));
  };

  render() {
    return (
      <div className="login">
        {this.state.apError && (
          <div
            className={this.state.shake ? 'animated shake' : ''}
            onAnimationEnd={() => this.setState({ shake: false })}
          >
            <Alert
              message="잘못된 계정 또는 비밀번호 a:ra  p:123"
              type="error"
              showIcon
              style={{ marginBottom: '16px' }}
            />
          </div>
        )}
        <LoginForm
          handleError={this.handleError}
          history={this.props.history}
          handleSuccess={this.handleSuccess}
        />
      </div>
    );
  }
}

export default withRouter(Login as any);
