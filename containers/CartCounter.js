import React from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { getCartItemCount } from '../redux/cart'

class CartCounter extends React.Component {

  render() {
    if(this.props.cartItemCount > 0 ){
        return (
                <View style={{ position: 'absolute', left: 20, bottom: 10,  backgroundColor: 'red', borderRadius: 9, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>{this.props.cartItemCount}</Text>
                </View> 
        )
    }else{
        return null
    }
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    cartItemCount: getCartItemCount(state),
  }
}

const CartCounterContainer = connect(
  mapStateToProps
)(CartCounter)

export default CartCounterContainer




