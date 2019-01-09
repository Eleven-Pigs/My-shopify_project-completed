import React from 'react'
import { connect } from 'react-redux'
import { AddressList } from '../components/AddressList'
import { getAllAddressIds, getIsFetching } from '../redux/user'
import CartActions from '../redux/cart'
import { getButtonBackgroundColor, getButtonTextColor } from '../redux/config'
import { withNavigation } from 'react-navigation'

class AddressListItem extends React.Component {

  addNewAddressPressed = () => {
    this.props.navigation.navigate("AddNewAddressScreen")
  }
  render(){
    return(
      <AddressList 
      addNewAddressPressed={this.addNewAddressPressed} 
      addressIds={this.props.addressIds} 
      isFetching={this.props.isFetching} 
      buttonBackgroundColor={this.props.buttonBackgroundColor} 
      buttonTextColor={this.props.buttonTextColor}/>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    addressIds: getAllAddressIds(state),
    isFetching: getIsFetching(state),
    buttonBackgroundColor: getButtonBackgroundColor(state),
    buttonTextColor: getButtonTextColor(state)
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