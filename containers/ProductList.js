import { connect } from 'react-redux'
import { ProductList } from '../components/ProductList'
import { getAllProductIds } from '../redux/productList'

const mapStateToProps = (state) => {
  return {
    productIds: getAllProductIds(state)
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    endReached: ownProps.endReached
  }
}


const ProductListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)

export default ProductListContainer