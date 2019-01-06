import React from 'react';
import { Icon } from 'expo';
import styles from './style'
import { theme } from '../../../constants/Theme'
export default class MaterialIcons extends React.Component {
  render() {
    return (
      <Icon.MaterialIcons
        name={this.props.name}
        size={26}
        style={ styles.icon }
        color={this.props.focused ? this.props.primaryColor : theme.iconLight}
      />
    );
  }
}