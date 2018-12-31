import React from 'react';
import { SafeAreaView } from 'react-native'
import ProductDetail from '../containers/ProductDetail'
import ProductImage from '../containers/ProductImage'
import ProductDetailAction, { getTitle } from '../redux/productDetail'
import { connect } from 'react-redux'
import { theme } from '../constants/Theme'
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
        <SafeAreaView style = {{flex:1}}>
          <ProductImage/>
          <ProductDetail/>
        </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    title: getTitle(state),
  }
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