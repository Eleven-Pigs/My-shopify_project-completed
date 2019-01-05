import React from 'react'
import { connect } from 'react-redux'
import  LoginComponent  from '../components/Login'
import UserActions from '../redux/user'
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';
import { getIsLogin } from '../redux/user'
import { getName } from '../redux/shop'

class Login extends React.Component {
  constructor(props){
    super(props)
  }
  navigateToRegister = () => {
      this.props.navigation.navigate("RegisterScreen")
    
  }
  componentDidUpdate = (prevProps) => {
    if(this.props.isLogin === true && prevProps.isLogin === false){
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Main', action: NavigationActions.navigate({routeName: 'ShoppingCart'}) }),
          NavigationActions.navigate({ routeName: 'Payment'})
        ],
        key: null 
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  render() {
    return (
        <LoginComponent shopName={this.props.shopName} onPressed={this.props.onPressed} registerPressed={this.navigateToRegister}/>
    );
  }

}


const mapStateToProps = state => {
  return {
    isLogin: getIsLogin(state),
    shopName: getName(state) 
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