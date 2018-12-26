import React from 'react';
import { Button } from 'react-native'

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Account',
  };
  componentDidMount(){
    
    
  }
  

  render() {
    return (
      <Button onPress={() => this.props.navigation.navigate('LoginScreen')} title="Login"/>
    );
  }
}
