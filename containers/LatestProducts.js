import { connect } from 'react-redux'
import { LatestProducts } from '../components/LatestProducts'
import { getLatestProductIds } from '../redux/shop'

const mapStateToProps = (state) => {
  return {
    productIds: getLatestProductIds(state)
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  
  return {
  }
}


const LatestProductContainers = connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestProducts)

export default LatestProductContainers