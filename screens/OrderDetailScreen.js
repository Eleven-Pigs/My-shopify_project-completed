import React from 'react';
import { SafeAreaView, Text } from 'react-native'
import { connect } from 'react-redux'
import OrderDetailActions,  { getTotalPrice, getCustomerUrl, getName, getOrderNumber, getProcessedAt, getShippingAddress, getSubtotalPrice, getTotalShippingPrice, getTotalTax} from '../redux/orderDetail'
class OrderList extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   headerTitle: 'Order Detail',
  };
  
  componentDidMount() {
    const id = this.props.navigation.getParam('id')
    console.log(this.props.navigation)
    this.props.requestUserOrderDetail(id)
  
  }

  render = () => {
    return (
        <SafeAreaView style = {{flex:1}}>
            <Text>{this.props.name}</Text>
            <Text>{this.props.processedAt}</Text>
            <Text>{this.props.subtotalPrice}</Text>
            <Text>{this.props.totalPrice}</Text>
            <Text>{this.props.totalShippingPrice}</Text>
            <Text>{this.props.totalTax}</Text>
            <Text>{this.props.customerUrl}</Text>
        </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    customerUrl: getCustomerUrl(state),
    name: getName(state),
    orderNumber: getOrderNumber(state),
    processedAt: getProcessedAt(state),
    shippingAddress: getShippingAddress(state),
    subtotalPrice: getSubtotalPrice(state),
    totalPrice: getTotalPrice(state),
    totalShippingPrice: getTotalShippingPrice(state),
    totalTax: getTotalTax(state),
  }
}
  


const mapDispatchToProps = dispatch => {
  return {
    requestUserOrderDetail: (id) => {
      dispatch(OrderDetailActions.requestUserOrderDetail(id) )
    }
  }
}


const OrderListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)


export default OrderListScreen