import React from 'react';
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import CartListContainer  from '../containers/CartList'
class ShoppingCart extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   header: null,
  };

  render = () => {
    return (
        <SafeAreaView>
            <CartListContainer/>
        </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {}
}


const mapDispatchToProps = dispatch => {
  return {}
}

const ShoppingCartScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart)


export default ShoppingCartScreen