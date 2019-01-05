import React from 'react';
import  RegisterContainer  from '../containers/Register'
import { getRegisterSuccess } from '../redux/user'
import { connect } from 'react-redux'
import { Alert } from 'react-native'

class Register extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };

componentDidUpdate(prevProps){
  if(this.props.isRegisterSuccess === true && prevProps.isRegisterSuccess === false){       
    
    Alert.alert(
      'You have successfully registerd',
      [
        {text: 'Login', onPress: () => this.props.navigation.goBack()},
      ],
      { cancelable: false }
    )
  }
}

  render() {
    return (
      <RegisterContainer/>
    );
  }
}
const mapStateToProps = state => {
  return {
    isRegisterSuccess: getRegisterSuccess(state)
  }
}


const mapDispatchToProps = dispatch => {
  return {}
}

const RegisterScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)


export default RegisterScreen