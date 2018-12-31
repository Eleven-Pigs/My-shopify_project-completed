import { connect } from 'react-redux'
import { getTitle, getAvailableForSale,getDescriptionHtml, getPrice  } from '../redux/productDetail'
import { ProductDetailComponent } from '../components/ProductDetail'
import CartActions from '../redux/cart'
const mapStateToProps = state => {
  return {
    title: getTitle(state),
    availableForSale: getAvailableForSale(state),
    descriptionHtml: getDescriptionHtml(state),
    price: getPrice(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product) => {
      dispatch(CartActions.requestAddProductToCheckout(product))
    }
  }
}

const ProductDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailComponent)

export default ProductDetailContainer