import React from 'react';
import { View } from 'react-native'
import ProductDetail from '../containers/ProductDetail'
import ProductImage from '../containers/ProductImage'
class ProductDetailScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render = () => {
    return (
      <View style = {{flex:1}}>
        <ProductImage/>
        <ProductDetail/>
      </View>
    )
  }

}


export default ProductDetailScreen