import React from 'react'
import { connect } from 'react-redux'
import  LoginComponent  from '../components/Login'
import UserActions from '../redux/user'
import { withNavigation } from 'react-navigation';

class Login extends React.Component {
  constructor(props){
    super(props)
  }
  navigateToRegister = () => {
     this.props.navigation.navigate('RegisterScreen')
  }

  render() {
    return (
        <LoginComponent onPressed={this.props.onPressed} registerPressed={this.navigateToRegister}/>
    );
  }

}


const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    onPressed: (email, password) => {
      dispatch(UserActions.requestLogin(email, password))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default withNavigation(LoginContainer)