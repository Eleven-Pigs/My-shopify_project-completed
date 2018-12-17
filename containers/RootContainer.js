import React from 'react';

import { connect } from 'react-redux'
import AppNavigator from '../navigation/AppNavigator'
import StartupActions from '../redux/startup'
class Root extends React.Component {
    componentDidMount(){
        this.props.startup()
    }
  render() {
    return (
        <AppNavigator />
    );
  }

}

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    startup: () => {
      dispatch(StartupActions.start())
    }
  }
}

const RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)

export default RootContainer