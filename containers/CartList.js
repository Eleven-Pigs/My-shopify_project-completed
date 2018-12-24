import { connect } from 'react-redux'
import { CartList } from '../components/CartList'
import { getAllProductIds } from '../redux/cart'

const mapStateToProps = (state) => {
  return {
    productIds: getAllProductIds(state)
  }
}

const CartListContainer = connect(
  mapStateToProps
)(CartList)

export default CartListContainer