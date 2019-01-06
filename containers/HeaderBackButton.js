import React from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { getPrimaryColor } from '../redux/config'
import Ionicons from '../components/Reusable/TabBarIcon/Ionicons';
import Materialicons from '../components/Reusable/TabBarIcon/Materialicons';
import { HeaderBackButton as ReactNavigationHeaderBackButton, withNavigation } from 'react-navigation';

class HeaderBackButtonContainer extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {primaryColor} = this.props
    return(
      <ReactNavigationHeaderBackButton onPress={() => this.props.navigation.goBack(null)} tintColor= {primaryColor}/>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    primaryColor: getPrimaryColor(state)
  }
}

const HeaderBackButton = connect(
  mapStateToProps
)(HeaderBackButtonContainer)

export default withNavigation(HeaderBackButton)


