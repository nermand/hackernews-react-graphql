import React, { Component } from 'react';

import { AUTH_TOKEN } from '../constants';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: true,
      email: '',
      password: '',
      name: ''
    }
  }

  render() {
    return (
      <div className="mv3">
        <h4>{this.state.login ? 'Login' : 'Sign up'}</h4>
        <div className="flex flex=column">
          {!this.state.login && (
            <input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <div className="pointer mr2 button" onClick={() => this.confirm()}>
            {this.state.login ? 'login' : 'create account'}
          </div>
          <div className="pointer button" onClick={() => this.setState({ login: !this.state.login})}>
            {this.state.login
              ? 'need to create an account?'
              : 'already have an account'}
          </div>
        </div>
      </div>
    );
  }

  confirm = async () => {
    const { name, email, password } = this.state;

    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password
        }
      });
      const { token } = result.data.login;
      this.saveUserData(token);
    } else {
      const result = await this.props.signupMutation({
        variables: {
          name,
          email,
          password
        }
      });
      const { token } = result.data.signup;
      this.saveUserData(token);
    }

    this.props.history.push('/');
  }

  saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' })
)(Login);
