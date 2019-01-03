import React from 'react';
import { Button } from 'react-native'
import  UserActions  from '../redux/user'
import { connect } from 'react-redux'

class Account extends React.Component {
  static navigationOptions = {
    title: 'Account',
  };
  componentDidMount(){
    
    
  }


  render() {
    return (
      <Button onPress={this.props.logout} title="logout"/>
    );
  }
}
const mapStateToProps = state => {
  return {
    
  }
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(UserActions.logout())
    },
  }
}

const AccountScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)


export default AccountScreen