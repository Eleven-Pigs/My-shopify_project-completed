import React from 'react';
import { connect } from 'react-redux'
import { getLatestProductById } from '../redux/shop'
import { BestSellingProductItem as Item}  from '../components/BestSellingProductItem'
import { withNavigation } from 'react-navigation';

class LatestProductItem extends React.Component {
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
    product: getLatestProductById(state, ownProps.id),
  }
}

const LatestProductItemContainer = connect(
  mapStateToProps
)(LatestProductItem)

export default withNavigation(LatestProductItemContainer)