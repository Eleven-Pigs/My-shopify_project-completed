import { connect } from 'react-redux'
import {  getAvailableForSale, getTotalPrice } from '../redux/productDetail'
import {  getIsAddingProductToCart } from '../redux/cart'
import { AddToCart } from '../components/AddToCart'
import CartActions from '../redux/cart'
import { getPrimaryColor } from '../redux/config'
const mapStateToProps = state => {
  return {
    price: getTotalPrice(state),
    isAvailableForSale: getAvailableForSale(state),
    isAddingProduct: getIsAddingProductToCart(state),
    primaryColor: getPrimaryColor(state),
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: () => {
      dispatch(CartActions.requestAddProductToCheckout())
    }
  }
}

const AddToCartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToCart)

export default AddToCartContainer