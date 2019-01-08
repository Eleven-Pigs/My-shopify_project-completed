import React from 'react';
import { connect } from 'react-redux'
import { getPrimaryColor } from '../redux/config'
import { BottomTabBar }  from 'react-navigation-tabs'

class TabBar extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return <BottomTabBar {...this.props}/>
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    primaryColor: getPrimaryColor(state)
  }
}

const TabBarBottomContainer = connect(
  mapStateToProps
)(TabBar)

export default TabBarBottomContainer




