import React from 'react';

import { connect } from 'react-redux'
import { ProductDetailComponent } from '../components/ProductDetail'
import ProductDetailAction, { getTitle } from '../redux/productDetail'


class ProductDetail extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.requestProductDetail('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE3NTk4NTk2MzgzMzY=')
  }

  render() {
    return (
      <ProductDetailComponent handleAlert = {this.handleAlert} text = {this.props.text}/>
    );
  }

}

const mapStateToProps = state => {
  return {
    text: getTitle(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestProductDetail: (id) => {
      dispatch(ProductDetailAction.requestProductDetail(id))
    }
  }
}

const ProductDetailScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail)

export default ProductDetailScreen