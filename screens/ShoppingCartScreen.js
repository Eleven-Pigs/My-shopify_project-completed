import React from 'react';
import { SafeAreaView, Button } from 'react-native'
import { connect } from 'react-redux'
import CartListContainer  from '../containers/CartList'
class ShoppingCart extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   header: null,
  };
  onPress = () => {
    this.props.navigation.navigate('PaymentScreen',{})
  }

  render = () => {
    return (
        <SafeAreaView style = {{flex:1}}>
            <CartListContainer/>
            <Button onPress={this.onPress} title="Make Payment"/>
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