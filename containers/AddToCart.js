import { connect } from 'react-redux'
import { getSelectedVariantImage, getSelectedVariantTitle, getTitle, getAvailableForSale,getDescriptionHtml, getTotalPrice } from '../redux/productDetail'
import { AddToCart } from '../components/AddToCart'
import CartActions from '../redux/cart'
const mapStateToProps = state => {
  return {
    price: getTotalPrice(state),
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