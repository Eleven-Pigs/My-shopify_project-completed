import { connect } from 'react-redux'
import ProductDetailAction, { getAllImages } from '../redux/productDetail'
import { ImageSlider } from '../components/ImageSlider'
import { getPrimaryColor } from '../redux/config';

const mapStateToProps = state => {
  return {
    images: getAllImages(state),
    primaryColor: getPrimaryColor(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

const ProductImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSlider)

export default ProductImageContainer