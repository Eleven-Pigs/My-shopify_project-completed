import React from 'react';
import { Icon } from 'expo';
import { theme } from '../../../constants/Theme'
import styles from './style'
export default class Entypo extends React.Component {
  render() {
    return (
      <Icon.Entypo
        name={this.props.name}
        size={26}
        style={ styles.icon }
        color={this.props.focused ? this.props.activeColor : this.props.inactiveColor  }
      />
    );
  }
}