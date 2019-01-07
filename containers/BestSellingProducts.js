import { connect } from 'react-redux'
import { BestSellingProducts } from '../components/BestSellingProducts'
import { getBestSellingProductIds } from '../redux/shop'

const mapStateToProps = (state) => {
  return {
    productIds: getBestSellingProductIds(state)
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  
  return {
  }
}


const BestSellingProductsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BestSellingProducts)

export default BestSellingProductsContainer