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
    this.props.requestProductDetail('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE2OTA5MTUzNDAzNTI=')
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
    }
  }
}

const ProductDetailScreenConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailScreen)


export default ProductDetailScreenConnect