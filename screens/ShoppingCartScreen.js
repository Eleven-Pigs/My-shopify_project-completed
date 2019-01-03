import React from 'react';
import { SafeAreaView, Alert } from 'react-native'
import { connect } from 'react-redux'
import CartListContainer  from '../containers/CartList'
import { Checkout }  from '../components/Checkout'
import { getTotalPrice } from '../redux/cart'
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
  onPress = () => {
    if(this.props.isLogin){
      this.props.navigation.navigate('PaymentScreen',{})
    }else{
      Alert.alert(
        'Checkout',
        'Do you want to login?',
        [
          {text: 'Yes', onPress: () => this.navigateToLogin(), style: 'cancel'},
          {text: 'Continue as guest', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
    
  }

  render = () => {
    return (
        <SafeAreaView style = {{flex:1}}>
            <CartListContainer/>
            <Checkout price={this.props.price} onPress={this.onPress}/>
        </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    price: getTotalPrice(state),
    isLogin: getIsLogin(state)
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