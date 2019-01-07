import React from 'react'
import { connect } from 'react-redux'
import { AddressList } from '../components/AddressList'
import { getAllAddressIds, getIsFetching } from '../redux/user'
import CartActions from '../redux/cart'
import { getPrimaryColor } from '../redux/config'
import { withNavigation } from 'react-navigation'

class AddressListItem extends React.Component {

  addNewAddressPressed = () => {
    this.props.navigation.navigate("AddNewAddressScreen")
  }
  render(){
    return(
      <AddressList addNewAddressPressed={this.addNewAddressPressed} addressIds={this.props.addressIds} isFetching={this.props.isFetching} primaryColor={this.props.primaryColor}/>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    addressIds: getAllAddressIds(state),
    isFetching: getIsFetching(state),
    primaryColor: getPrimaryColor(state)
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
)(AddressListItem)

export default withNavigation(AddressListContainer)