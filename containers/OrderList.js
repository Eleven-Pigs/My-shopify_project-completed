import React from 'react'
import { connect } from 'react-redux'
import { OrderList as Item } from '../components/OrderList'
import { getAllAddressIds, getIsFetching } from '../redux/user'
import CartActions from '../redux/cart'
import { getPrimaryColor } from '../redux/config'
import { withNavigation } from 'react-navigation'

class OrderList extends React.Component {

  addNewAddressPressed = () => {
    this.props.navigation.navigate("AddNewAddressScreen")
  }
  render(){
    return(
      <Item addNewAddressPressed={this.addNewAddressPressed} addressIds={this.props.addressIds} isFetching={this.props.isFetching} primaryColor={this.props.primaryColor}/>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    addressIds: getAllAddressIds(state),
    isFetching: getIsFetching(state),
    primaryColor: getPrimaryColor(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onRefresh:() => { dispatch(CartActions.requestCartDetail())}
  }
}
const OrderListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)

export default withNavigation(OrderListContainer)