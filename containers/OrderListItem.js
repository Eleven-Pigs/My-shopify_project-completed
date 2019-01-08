import React from 'react';
import { connect } from 'react-redux'
import { getAddressById , getIsAddressDefault} from '../redux/user'
import { OrderListItem as Item}  from '../components/OrderListItem'
import { withNavigation } from 'react-navigation';
import { Alert } from 'react-native'
import  CartActions  from '../redux/cart'

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
        <Item isDefault={this.props.isDefault} onRemoveProduct={this.removeProduct} onPressItem={this.navigateToProductList} onDeletePress={this.onDeletePress}  address={this.props.address} />
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    address: getAddressById(state, ownProps.id),
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