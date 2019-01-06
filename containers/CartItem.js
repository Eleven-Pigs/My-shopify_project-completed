import React from 'react';
import { connect } from 'react-redux'
import { getProductId, getProductTitle, getProductPrice, getProductImage, getProductQuantity, getProductVariantTitle } from '../redux/cart'
import { CartItem as Item}  from '../components/CartItem'
import { withNavigation } from 'react-navigation';
import { Alert } from 'react-native'
import  CartActions  from '../redux/cart'

class CartItem extends React.Component {
  navigateToProductList = () => {
    const id = this.props.productId
     this.props.navigation.navigate('ProductDetailScreen',{
       productId: id
     })
  }

  removeProduct = () => {
    this.props.requestRemoveProduct(this.props.id)
  }

  onDeletePress = () => {
    Alert.alert(
      'Are you sure you want to remove this product?',
      undefined,
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed')},
        {text: 'Yes', onPress: () => this.removeProduct()},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
        <Item
        title={this.props.title}
        variantTitle={this.props.variantTitle}
        price={this.props.price}
        image={this.props.image}
        quantity={this.props.quantity}
        onPressItem={this.navigateToProductList}
        onDeletePress={this.onDeletePress} />
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    title: getProductTitle(state, ownProps.id),
    productId: getProductId(state, ownProps.id),
    variantTitle: getProductVariantTitle(state, ownProps.id),
    price: getProductPrice(state, ownProps.id),
    image: getProductImage(state, ownProps.id),
    quantity: getProductQuantity(state, ownProps.id),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRemoveProduct: (id) => {
      dispatch(CartActions.requestRemoveProductFromCheckout(id))
    }
  }
}

const CartItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItem)

export default withNavigation(CartItemContainer)