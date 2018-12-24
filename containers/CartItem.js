import React from 'react';
import { connect } from 'react-redux'
import { getProductById } from '../redux/cart'
import { CartItem as Item}  from '../components/CartItem'
import { withNavigation } from 'react-navigation';

class CartItem extends React.Component {
  navigateToProductList = () => {
    const id = this.props.product.productId
     this.props.navigation.navigate('ProductDetailScreen',{
       productId: id
     })
  }

  render() {
    return (
        <Item product={this.props.product} onPressItem={this.navigateToProductList} />
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    product: getProductById(state, ownProps.id),
  }
}

const CartItemContainer = connect(
  mapStateToProps
)(CartItem)

export default withNavigation(CartItemContainer)