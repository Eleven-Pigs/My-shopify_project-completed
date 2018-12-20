import React from 'react';
import { View, Button } from 'react-native'
import ProductDetail from '../containers/ProductDetail'
import ProductImage from '../containers/ProductImage'
import ProductDetailAction from '../redux/productDetail'
import { connect } from 'react-redux'

class ProductDetailScreen extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   
  };

  componentDidMount(){
    const productId = this.props.navigation.getParam('productId');
    this.props.requestProductDetail(productId)
  }

  componentWillUnmount(){
    this.props.clearProductDetail()
  }

  render = () => {
    return (
        <View style = {{flex:1}}>
          <ProductImage/>
          <ProductDetail/>
        </View>
    )
  }

}

const mapStateToProps = state => {
  return {}
}


const mapDispatchToProps = dispatch => {
  return {
    requestProductDetail: (id) => {
      dispatch(ProductDetailAction.requestProductDetail(id))
    },
    clearProductDetail: () => {
      dispatch(ProductDetailAction.clearProductDetail())
    }
  }
}

const ProductDetailScreenConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailScreen)


export default ProductDetailScreenConnect