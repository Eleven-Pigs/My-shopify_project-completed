import React from 'react';
import { SafeAreaView, Alert } from 'react-native'
import { connect } from 'react-redux'
import OrderListContainer  from '../containers/OrderList'
import OrderDetailActions from '../redux/orderDetail'

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
            <OrderListContainer/>
        </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
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