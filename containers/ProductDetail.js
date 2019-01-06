import React from 'react';
import { connect } from 'react-redux'
import { getVariantCount, getSelectedVariantImage, getSelectedVariantTitle, getTitle, getAvailableForSale,getDescriptionHtml, getTotalPrice, getDescription  } from '../redux/productDetail'
import { getIsProductAdded } from '../redux/cart'
import { withNavigation } from 'react-navigation';
import  ProductDetailComponent  from '../components/ProductDetail'
import CartActions from '../redux/cart'


class ProductDetail extends React.Component {
  constructor(props){
    super(props)
  }
  navigateToCart = () => {
     this.props.navigation.navigate('ShoppingCart')
  }

  render() {
    return (
        <ProductDetailComponent 
          title={this.props.title}
          availableForSale={this.props.availableForSale}
          descriptionHtml={this.props.descriptionHtml}
          description={this.props.description}
          price={this.props.price}
          variantTitle={this.props.variantTitle}
          variantImage={this.props.variantImage}
          isProductAdded={this.props.isProductAdded}
          navigateToCart={this.navigateToCart}
          resetIsAddedToCart={this.props.resetIsAddedToCart}
          addToCart={this.addToCart}
          variantCount={this.props.variantCount}
        />
    );
  }

}

const mapStateToProps = state => {
  return {
    title: getTitle(state),
    availableForSale: getAvailableForSale(state),
    descriptionHtml: getDescriptionHtml(state),
    description: getDescription(state),
    price: getTotalPrice(state),
    variantTitle: getSelectedVariantTitle(state),
    variantImage: getSelectedVariantImage(state),
    isProductAdded: getIsProductAdded(state),
    variantCount: getVariantCount(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product) => {
      dispatch(CartActions.requestAddProductToCheckout(product))
    },    
    resetIsAddedToCart: () => {
      dispatch(CartActions.resetIsAddedToCart())
    }
  }
}

const ProductDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail)

export default withNavigation(ProductDetailContainer)