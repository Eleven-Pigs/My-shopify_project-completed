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
    if (productId){
      this.props.requestProductDetail(productId)
    }else{
      const handle = this.props.navigation.getParam('handle');
      this.props.requestProductDetailByHandle(handle)
    }
    
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
    requestProductDetailByHandle: (handle) => {
      dispatch(ProductDetailAction.requestProductDetailByHandle(handle))
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