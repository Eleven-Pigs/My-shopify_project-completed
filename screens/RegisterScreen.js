import React from 'react';
import  RegisterContainer  from '../containers/Register'

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };

  render() {
    return (
      <RegisterContainer/>
    );
  }
}
