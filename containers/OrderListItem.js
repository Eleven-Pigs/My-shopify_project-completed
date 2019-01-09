import React from 'react';
import { connect } from 'react-redux'
import { getIsAddressDefault} from '../redux/user'
import { OrderListItem as Item}  from '../components/OrderListItem'
import { withNavigation } from 'react-navigation';
import { Alert } from 'react-native'
import  CartActions  from '../redux/cart'
import { getOrderById } from '../redux/order';
import { getMoneyFormat } from '../redux/shop';

class OrderListItem extends React.Component {
  navigateToOrderDetail = () => {
     this.props.navigation.navigate('OrderDetailScreen',{
       id: this.props.id
     })
  }


  render() {
    return (
        <Item moneyFormat={this.props.moneyFormat} onPressItem={this.navigateToOrderDetail} order={this.props.order} />
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    order: getOrderById(state, ownProps.id),
    moneyFormat: getMoneyFormat(state),
    isDefault: getIsAddressDefault(state, ownProps.id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRemoveProduct: (id) => {
      dispatch(CartActions.requestRemoveProductFromCheckout(id))
    }
  }
}

const OrderListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderListItem)

export default withNavigation(OrderListItemContainer)