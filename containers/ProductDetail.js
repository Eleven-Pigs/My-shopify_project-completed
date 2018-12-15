import { connect } from 'react-redux'
import ProductDetailAction, { getTitle } from '../redux/productDetail'
import { ProductDetailComponent } from '../components/ProductDetail'

const mapStateToProps = state => {
  return {
    text: getTitle(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestProductDetail: (id) => {
      dispatch(ProductDetailAction.requestProductDetail(id))
    }
  }
}

const ProductDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailComponent)

export default ProductDetailContainer