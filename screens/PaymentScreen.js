import React from 'react';
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { PaymentComponent } from '../components/Payment'
import { getWebUrl } from '../redux/cart'
import { getAccessToken, getIsLogin } from '../redux/user'
import CartActions from '../redux/cart'
import { StackActions, NavigationActions } from 'react-navigation';
class Payment extends React.Component {
  static navigationOptions = {
    headerTitle: 'Checkout'
  };

  paymentCompleted = () => {
    if(this.props.isLogin){
      this.props.paymentSuccess()
      this.props.navigation.goBack(null)   
    }else{
      this.props.paymentSuccess()
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main', action: NavigationActions.navigate({routeName: 'ShoppingCart'}) }),
        ],
        key: null 
      })
      this.props.navigation.dispatch(resetAction)
    }
    
  }

  goToLogin = () => {
    this.props.navigation.navigate("LoginScreen")
  }

  render() {
    return (
        <SafeAreaView style = {{flex:1}}>
            <PaymentComponent goToLogin={this.goToLogin} userAccessToken={this.props.userAccessToken} url={this.props.url} paymentCompleted={this.paymentCompleted}/>
        </SafeAreaView>
    );
  }

}

const mapStateToProps = state => {
  return {
      url: getWebUrl(state),
      userAccessToken: getAccessToken(state),
      isLogin: getIsLogin(state),
  }
}
const mapDispatchToProps = dispatch => {
  return {
    paymentSuccess: () => {
      dispatch(CartActions.paymentSuccess())
    }
  }
}

const PaymentScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment)

export default PaymentScreen