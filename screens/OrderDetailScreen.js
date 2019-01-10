import React from 'react';
import { SafeAreaView, Text, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import OrderDetailActions,  { getTotalPrice, getCustomerUrl, getName, getOrderNumber, getProcessedAt, getShippingAddress, getSubtotalPrice, getTotalShippingPrice, getTotalTax, getProductIds, getProductById} from '../redux/orderDetail'
import  OrderDetailProductItem  from '../containers/OrderDetailProductItem'
import {theme} from '../constants/Theme'
class OrderList extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   headerTitle: 'Order Detail',
  };
  
  componentDidMount() {
    const id = this.props.navigation.getParam('id')
    this.props.requestUserOrderDetail(id)
  
  }
  _renderProducts = (productIds) => {
    return (
      productIds.map(id => {
        return(
          <OrderDetailProductItem key= {id} id = {id}/>
        )
      })
    )
  }
  formatDate = (date) => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const d = new Date(date);
    return `${months[d.getMonth()]} ${d.getDay()}, ${d.getFullYear()}`
  }

  render = () => {
    return (
        <SafeAreaView style = {{flex:1}}>
          <ScrollView style = {{backgroundColor: theme.listBackground}}>
            <View style = {{padding: 20}}>
              <Text style = {{fontSize: 20, fontWeight:'bold'}}>Order {this.props.name}</Text>
              <Text>Processed at {this.formatDate(this.props.processedAt)}</Text>
            </View>
            <View style = {{padding: 20,backgroundColor: 'white'}}>
              {this._renderProducts(this.props.productIds)}
              <Text style = {{marginTop: 20}}>Subtotal Price: {this.props.subtotalPrice}</Text>
              <Text>Shipping Price: {this.props.totalShippingPrice}</Text>
              <Text>Total Tax: {this.props.totalTax}</Text>
              <Text>Total Price: {this.props.totalPrice}</Text>
            </View>
            <View style = {{marginTop: 15, paddingLeft: 20 }}>
              <Text style = {{fontSize: 18, fontWeight: 'bold' }}>Shipping Address</Text>
            </View>
            <View style = {{marginTop: 5,padding: 20,backgroundColor: 'white'}}>
              <Text>{this.props.shippingAddress.address1}</Text>
              <Text>{this.props.shippingAddress.address2}</Text>
              <Text>{this.props.shippingAddress.zip}</Text>
              <Text>{this.props.shippingAddress.city}</Text>
              <Text>{this.props.shippingAddress.province}</Text>
              <Text>{this.props.shippingAddress.country}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    state: state,
    productIds: getProductIds(state),
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