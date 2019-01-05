import React from 'react';
import { SafeAreaView, Alert } from 'react-native'
import { connect } from 'react-redux'
import CartListContainer  from '../containers/CartList'
import { Checkout }  from '../components/Checkout'
import { getTotalPrice, getShippingAddress, getCartItemCount } from '../redux/cart'
import { getIsLogin } from '../redux/user'

class ShoppingCart extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   headerTitle: 'Shopping Cart',
  };

  navigateToLogin = () => {
    this.props.navigation.navigate('LoginScreen',{})
  }

  continueAsGuest = () => {
    if(this.props.shippingAddress){
      this.props.navigation.navigate('PaymentScreen',{})
    }else{
      this.props.navigation.navigate('AddAddressScreen',{})
    }
  }

  onPress = () => {
    if(this.props.isLogin){
      this.props.navigation.navigate('PaymentScreen',{})
    }else{
      Alert.alert(
        'Checkout',
        'Continue as guest?',
        [
          {text: 'Login', onPress: () => this.navigateToLogin(), style: 'cancel'},
          {text: 'Yes', onPress: () => this.continueAsGuest()},
        ],
        { cancelable: false }
      )
    }
    
  }

  render = () => {
    return (
        <SafeAreaView style = {{flex:1}}>
            <CartListContainer/>
            <Checkout price={this.props.price} onPress={this.onPress} cartItemCount = {this.props.cartItemCount}/>
        </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    price: getTotalPrice(state),
    isLogin: getIsLogin(state),
    shippingAddress: getShippingAddress(state),
    cartItemCount: getCartItemCount(state)
  }
}


const mapDispatchToProps = dispatch => {
  return {}
}

const ShoppingCartScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart)


export default ShoppingCartScreen