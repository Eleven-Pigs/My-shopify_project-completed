import React from 'react';
import { SafeAreaView, Button } from 'react-native'
import { connect } from 'react-redux'
import CartListContainer  from '../containers/CartList'
import { Checkout }  from '../components/Checkout'
import { getTotalPrice } from '../redux/cart'

class ShoppingCart extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   headerTitle: 'Shopping Cart',
  };
  onPress = () => {
    this.props.navigation.navigate('PaymentScreen',{})
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
    price: getTotalPrice(state)
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