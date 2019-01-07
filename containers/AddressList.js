import { connect } from 'react-redux'
import { AddressList } from '../components/AddressList'
import { getAllAddressIds, getIsFetching } from '../redux/user'
import CartActions from '../redux/cart'
const mapStateToProps = (state) => {
  return {
    addressIds: getAllAddressIds(state),
    isFetching: getIsFetching(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onRefresh:() => { dispatch(CartActions.requestCartDetail())}
  }
}
const AddressListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressList)

export default AddressListContainer