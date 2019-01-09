import React from 'react';
import { connect } from 'react-redux'
import { getIsAddressDefault} from '../redux/user'
import { OrderListItem as Item}  from '../components/OrderListItem'
import { withNavigation } from 'react-navigation';
import { Alert } from 'react-native'
import  CartActions  from '../redux/cart'
import { getOrderById } from '../redux/order';

class OrderListItem extends React.Component {
  navigateToProductList = () => {
    const id = this.props.productId
     this.props.navigation.navigate('ProductDetailScreen',{
       productId: id
     })
  }

  removeProduct = () => {

  }

  onDeletePress = () => {

  }

  render() {
    return (
        <Item onPressItem={this.navigateToProductList} order={this.props.order} />
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    order: getOrderById(state, ownProps.id),
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