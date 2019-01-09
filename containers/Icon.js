import React from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { getActiveBottomIconColor, getInactiveBottomIconColor } from '../redux/config'
import Ionicons from '../components/Reusable/TabBarIcon/Ionicons';
import Materialicons from '../components/Reusable/TabBarIcon/Materialicons';

class Icon extends React.Component {
  constructor(props){
    super(props)
  }

  _renderIonicons = (focused, name, activeIconColor, inactiveIconColor) => (
    <Ionicons
      focused={focused}
      name={name}
      activeColor={activeIconColor}
      inactiveColor={inactiveIconColor}
    />
  )
  _renderMaterialicons = (focused, name, activeIconColor, inactiveIconColor) => (
    <Materialicons
    focused={focused}
    name={name}
    activeColor={activeIconColor}
    inactiveColor={inactiveIconColor}
    />
  )

  render() {
    const {icon, focused, name, activeIconColor, inactiveIconColor} = this.props
    switch(icon){
      case 'Materialicon':
        return this._renderMaterialicons(focused, name, activeIconColor, inactiveIconColor)
        break
      case 'Ionicon':
        return this._renderIonicons(focused, name, activeIconColor, inactiveIconColor)
        break
    }
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    activeIconColor: getActiveBottomIconColor(state),
    inactiveIconColor: getInactiveBottomIconColor(state),
  }
}

const IconContainer = connect(
  mapStateToProps
)(Icon)

export default IconContainer




