import React from 'react';

import { connect } from 'react-redux'
import { HomeComponent } from '../components/Home'
import { getText } from '../redux/user'
import CartActions from '../redux/cart'
import ProductDetailActions from '../redux/productDetail'
class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handleProductClick = (handle) => {
    this.props.navigation.navigate('ProductDetailScreen',{
      handle: handle
    })
  }

  render() {
    return (
      <HomeComponent handleProductClick = {this.handleProductClick}/>
    );
  }

}

const mapStateToProps = state => {
  return {
    text: getText(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(CartActions.requestAddProductToCheckout({
        variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNjQ3NTE3MTU1MzM0NA==',
        quantity: 1
      }))
    },
    setTitle: (title) => {
      dispatch(ProductDetailActions.setTitle(title))
    }
  }
}

const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeScreen