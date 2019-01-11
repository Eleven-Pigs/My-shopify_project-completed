import React from 'react';

import { connect } from 'react-redux'
import { SafeAreaView, View, WebView } from 'react-native';
import { getHeaderBackgroundColor, getColorSelectionList, getPrimaryColor } from '../redux/config';
import ColorPalette from 'react-native-color-palette'
import { Icon } from 'expo'
import { getDescriptionHtml } from '../redux/productDetail';

class ProductDescription extends React.Component {


  render() {
    return (
      <SafeAreaView style = {{flex:1}}>
          <WebView
              source={{html: this.props.descriptionHtml}}
              scalesPageToFit={false}
          />
      </SafeAreaView>
    );
  }

}

const mapStateToProps = state => {
  return {
    headerBackroundColor: getHeaderBackgroundColor(state),
    primaryColor: getPrimaryColor(state),
    colorSelectionList: getColorSelectionList(state),
    descriptionHtml: getDescriptionHtml(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}

const ProductDescriptionScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDescription)

export default ProductDescriptionScreen