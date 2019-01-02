import { connect } from 'react-redux'
import { getSelectedVariantImage, getSelectedVariantTitle, getTitle, getAvailableForSale,getDescriptionHtml, getPrice  } from '../redux/productDetail'
import { AddToCart } from '../components/AddToCart'
import CartActions from '../redux/cart'
const mapStateToProps = state => {
  return {
    title: getTitle(state),
    availableForSale: getAvailableForSale(state),
    descriptionHtml: getDescriptionHtml(state),
    price: getPrice(state),
    variantTitle: getSelectedVariantTitle(state),
    variantImage: getSelectedVariantImage(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product) => {
      dispatch(CartActions.requestAddProductToCheckout(product))
    }
  }
}

const AddToCartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToCart)

export default AddToCartContainer