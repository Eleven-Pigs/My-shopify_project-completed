import { connect } from 'react-redux'
import { getTitle } from '../redux/productDetail'
import { ProductDetailComponent } from '../components/ProductDetail'
import CartActions from '../redux/cart'
const mapStateToProps = state => {
  return {
    text: getTitle(state)
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