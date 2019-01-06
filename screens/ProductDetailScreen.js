import React from 'react';
import { SafeAreaView, View, Button, Text, TouchableOpacity } from 'react-native'
import ProductDetail from '../containers/ProductDetail'
import ProductImage from '../containers/ProductImage'
import AddToCart from '../containers/AddToCart'
import ProductDetailAction, { getTitle, getIsFetching } from '../redux/productDetail'
import { connect } from 'react-redux'
import { theme } from '../constants/Theme'
import ProductDetailPlaceholder from '../components/Placeholder/ProductDetailPlaceholder';

class ProductDetailScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {

  };

  componentDidMount() {
    const productId = this.props.navigation.getParam('productId');
    if (productId) {
      this.props.requestProductDetail(productId)
    } else {
      const handle = this.props.navigation.getParam('handle');
      this.props.requestProductDetailByHandle(handle)
    }

  }

  componentWillUnmount() {
    this.props.clearProductDetail()
  }

  _renderProductDetail = (isFetching) => {
    if (isFetching){
      return(
        <ProductDetailPlaceholder/>
      )
    }else{
      return (
          <View style = {{flex:1,backgroundColor: theme.listBackground}}>
            <View style = {{flex:6}}>
              <ProductImage/>
            </View>
            <View style = {{flex: 4}}>
              <ProductDetail/>
            </View>
          </View>
        
      )
    }
  }

  render = () => {
    return (
      <SafeAreaView style = {{flex:1}}>
        {this._renderProductDetail(this.props.isFetching)}
        <AddToCart  />
      </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    title: getTitle(state),
    isFetching: getIsFetching(state),
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