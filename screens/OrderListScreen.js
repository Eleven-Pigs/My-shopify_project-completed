import React from 'react';
import { SafeAreaView, Alert } from 'react-native'
import { connect } from 'react-redux'
import AddressListContainer  from '../containers/AddressList'
import { Checkout }  from '../components/Checkout'
import { getTotalPrice, getShippingAddress, getCartItemCount } from '../redux/cart'
import { getIsLogin } from '../redux/user'
import { getPrimaryColor } from '../redux/config'
import OrderActions from '../redux/order'

class OrderList extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   headerTitle: 'Orders',
  };
  
  componentDidMount() {
    this.props.requestUserOrders()

  }

  render = () => {
    return (
        <SafeAreaView style = {{flex:1}}>
            <AddressListContainer/>
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
    primaryColor: getPrimaryColor(state)
  }
}


const mapDispatchToProps = dispatch => {
  return {
    requestUserOrders: () => {
      dispatch(OrderActions.requestUserOrders() )
    }
  }
}


const OrderListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)


export default OrderListScreen