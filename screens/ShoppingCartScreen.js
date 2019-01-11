import React from 'react';
import { SafeAreaView, Alert } from 'react-native'
import { connect } from 'react-redux'
import CartListContainer  from '../containers/CartList'
import { Checkout }  from '../components/Checkout'
import { getTotalPrice, getShippingAddress, getCartItemCount, getOrder } from '../redux/cart'
import { getIsLogin } from '../redux/user'
import { getPrimaryColor } from '../redux/config'
import CartActions from '../redux/cart'
class ShoppingCart extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   headerTitle: 'Shopping Cart',
  };

  navigateToLogin = () => {
    this.props.navigation.navigate('LoginScreen',{'ShoppingCartScreen': true})
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
  componentDidMount(){
    this.props.requestCartDetail()
  }
  componentDidUpdate(prevProps){
    if(this.props.isLogin){
      if(prevProps.order === null && this.props.order != null){
        const orderId = this.props.order.id 
        this.props.navigation.navigate('OrderDetailScreen',{
          id: orderId
        })
      }
    }else{
      Alert.alert(
        'Payment Success',
        'Please check your email for details.',
        [
          {text: 'Okay', onPress: () => console.log('guest')},
        ],
        { cancelable: false }
      )
    }
  }

  render = () => {
    return (
        <SafeAreaView style = {{flex:1}}>
            <CartListContainer/>
            <Checkout primaryColor={this.props.primaryColor} price={this.props.price} onPress={this.onPress} cartItemCount = {this.props.cartItemCount}/>
        </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    price: getTotalPrice(state),
    isLogin: getIsLogin(state),
    shippingAddress: getShippingAddress(state),
    cartItemCount: getCartItemCount(state),
    primaryColor: getPrimaryColor(state),
    order: getOrder(state)
  }
}


const mapDispatchToProps = dispatch => {
  return {
    requestCartDetail: () => {
      dispatch(CartActions.requestCartDetail())
    },
    
  }
}

const ShoppingCartScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart)


export default ShoppingCartScreen