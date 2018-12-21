import { connect } from 'react-redux'
import { ProductList } from '../components/ProductList'
import { getAllProductIds } from '../redux/productList'

const mapStateToProps = (state) => {
  return {
    productIds: getAllProductIds(state)
  }
}

const ProductListContainer = connect(
  mapStateToProps
)(ProductList)

export default ProductListContainer