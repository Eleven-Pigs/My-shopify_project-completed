import React from 'react';
import { LinkComponent } from '../components/Link'

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Account',
  };

  render() {
    return (
      <LinkComponent/>
    );
  }
}
