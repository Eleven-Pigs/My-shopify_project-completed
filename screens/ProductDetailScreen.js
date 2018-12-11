import React from 'react';

import { connect } from 'react-redux'
import { ProductDetailComponent } from '../components/ProductDetail'

class ProductDetail extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handleAlert = () => {

  }

  render() {
    return (
      <ProductDetailComponent handleAlert = {this.handleAlert} text = {this.props.text}/>
    );
  }

}

const mapStateToProps = state => {
  return {
    text: 'whattt'
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(UserActions.helloWorld())
    }
  }
}

const ProductDetailScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail)

export default ProductDetailScreen