import { connect } from 'react-redux'
import { CartList } from '../components/CartList'
import { getAllProductIds, getIsFetching } from '../redux/cart'
import CartActions from '../redux/cart'
const mapStateToProps = (state) => {
  return {
    productIds: getAllProductIds(state),
    isFetching: getIsFetching(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onRefresh:() => { dispatch(CartActions.requestCartDetail())}
  }
}
const CartListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartList)

export default CartListContainer