import { connect } from 'react-redux'
import { getTitle } from '../redux/productDetail'
import { ProductDetailComponent } from '../components/ProductDetail'

const mapStateToProps = state => {
  return {
    text: getTitle(state)
  }
}

const ProductDetailContainer = connect(
  mapStateToProps
)(ProductDetailComponent)

export default ProductDetailContainer