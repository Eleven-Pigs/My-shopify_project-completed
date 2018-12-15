import { connect } from 'react-redux'
import ProductDetailAction, { getAllImages } from '../redux/productDetail'
import { ImageSlider } from '../components/ImageSlider'

const mapStateToProps = state => {
  return {
    images: getAllImages(state)
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