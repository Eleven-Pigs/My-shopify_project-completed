import React from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { getPrimaryColor } from '../redux/config'
import Ionicons from '../components/Reusable/TabBarIcon/Ionicons';
import Materialicons from '../components/Reusable/TabBarIcon/Materialicons';

class Icon extends React.Component {
  constructor(props){
    super(props)
  }

  _renderIonicons = (focused, name, primaryColor) => (
    <Ionicons
      focused={focused}
      name={name}
      primaryColor={primaryColor}
    />
  )
  _renderMaterialicons = (focused, name, primaryColor) => (
    <Materialicons
    focused={focused}
    name={name}
    primaryColor={primaryColor}
    />
  )

  render() {
    const {icon, focused, name, primaryColor} = this.props
    switch(icon){
      case 'Materialicon':
        return this._renderMaterialicons(focused, name, primaryColor)
        break
      case 'Ionicon':
        return this._renderIonicons(focused, name, primaryColor)
        break
    }
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    primaryColor: getPrimaryColor(state)
  }
}

const IconContainer = connect(
  mapStateToProps
)(Icon)

export default IconContainer




