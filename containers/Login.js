import React from 'react'
import { connect } from 'react-redux'
import  LoginComponent  from '../components/Login'
import UserActions from '../redux/user'
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';
import { getIsLogin, getIsFetching, getLoginError } from '../redux/user'
import { getName } from '../redux/shop'
import { getPrimaryColor } from '../redux/config';
import { Alert } from 'react-native'



class Login extends React.Component {
  constructor(props){
    super(props)
  }
  navigateToRegister = () => {
      this.props.navigation.navigate("RegisterScreen")
  }
  navigateToPayment = () => {
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

  componentDidUpdate = (prevProps) => {
    if(this.props.isLogin === true && prevProps.isLogin === false){
      const isFromShoppingCart = this.props.navigation.getParam('ShoppingCartScreen', false)
      if(isFromShoppingCart){
        this.navigateToPayment()
      }else{
        this.props.navigation.goBack(null)
      }
    }
    if(this.props.loginError === true && prevProps.loginError === false){
      Alert.alert(
        'Sorry',
        'You have submit and incorrect password or email',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      this.props.resetLoginError()
    }
  }

  render() {
    return (
        <LoginComponent isFetching={this.props.isFetching} primaryColor={this.props.primaryColor} shopName={this.props.shopName} onPressed={this.props.onPressed} registerPressed={this.navigateToRegister}/>
    );
  }

}


const mapStateToProps = state => {
  return {
    isLogin: getIsLogin(state),
    shopName: getName(state),
    primaryColor: getPrimaryColor(state),
    isFetching: getIsFetching(state),
    loginError: getLoginError(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onPressed: (email, password) => {
      dispatch(UserActions.requestLogin(email, password))
    },
    resetLoginError: () => {
      dispatch(UserActions.resetLoginError())
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default withNavigation(LoginContainer)