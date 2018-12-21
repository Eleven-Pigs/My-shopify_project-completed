import React from 'react';
import { connect } from 'react-redux'
import { getProductById } from '../redux/productList'
import { ProductItem as Item}  from '../components/ProductItem'
import { withNavigation } from 'react-navigation';

class ProductItem extends React.Component {
  navigateToProductDetail = () => {
    const id = this.props.product.id
     this.props.navigation.navigate('ProductDetailScreen',{
      productId: id
     })
  }

  render() {
    return (
        <Item product={this.props.product} onPressItem={this.navigateToProductDetail} />
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    product: getProductById(state, ownProps.id),
  }
}

const ProductItemContainer = connect(
  mapStateToProps
)(ProductItem)

export default withNavigation(ProductItemContainer)