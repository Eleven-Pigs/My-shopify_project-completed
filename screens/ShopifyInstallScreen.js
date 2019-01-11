import React from 'react';

import { connect } from 'react-redux'
import { SafeAreaView, View, WebView } from 'react-native';
import { getHeaderBackgroundColor, getColorSelectionList, getPrimaryColor } from '../redux/config';
import ColorPalette from 'react-native-color-palette'
import { Icon } from 'expo'
import { getDescriptionHtml } from '../redux/productDetail';

class ShopifyInstall extends React.Component {


  onMessage = (event) => {
    console.log(event)
  }
  render() {
    jscript = `
    var hidden = document.getElementById("hiddenValue");
    if(hidden){
      window.postMessage(hidden.value); 
      window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    }
    window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    
    `
    return (
      <SafeAreaView style = {{flex:1}}>
          <WebView
              source={{uri: 'https://6e3253bb.ngrok.io/auth/new'}}
              scalesPageToFit={false}
              onMessage={event => this.onMessage(event.nativeEvent.data)}
              injectedJavaScript={jscript}
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

const ShopifyInstallScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopifyInstall)

export default ShopifyInstallScreen