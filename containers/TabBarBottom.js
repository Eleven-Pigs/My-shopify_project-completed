import React from 'react';
import { connect } from 'react-redux'
import { getBottomTabBarColor } from '../redux/config'
import { BottomTabBar }  from 'react-navigation-tabs'

class TabBar extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return <BottomTabBar {...this.props} style = {{backgroundColor: this.props.bottomTabBarColor}}/>
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    bottomTabBarColor: getBottomTabBarColor(state)
  }
}

const TabBarBottomContainer = connect(
  mapStateToProps
)(TabBar)

export default TabBarBottomContainer




