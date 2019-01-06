import React from 'react';
import { Icon } from 'expo';
import { theme } from '../../../constants/Theme'
import styles from './style'
export default class Ionicons extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={ styles.icon }
        color={this.props.focused ? this.props.primaryColor : theme.iconLight }
      />
    );
  }
}