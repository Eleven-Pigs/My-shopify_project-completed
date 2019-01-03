import React from 'react'
import { connect } from 'react-redux'
import  LoginComponent  from '../components/Login'
import UserActions from '../redux/user'
import { withNavigation } from 'react-navigation';
import { getIsLogin } from '../redux/user'

class Login extends React.Component {
  constructor(props){
    super(props)
  }
  navigateToRegister = () => {
     this.props.navigation.navigate('RegisterScreen')
  }
  componentDidUpdate = (prevProps) => {
    if(this.props.isLogin === true && prevProps.isLogin === false){
      this.props.navigation.goBack(null)
    }
  }

  render() {
    return (
        <LoginComponent onPressed={this.props.onPressed} registerPressed={this.navigateToRegister}/>
    );
  }

}


const mapStateToProps = state => {
  return {
    isLogin: getIsLogin(state), 
  }
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