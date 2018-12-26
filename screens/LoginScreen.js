import React from 'react';
import  LoginContainer from '../containers/Login'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    
  };

  render() {
    return (
      <LoginContainer/>
    );
  }
}
