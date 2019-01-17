import React from 'react';

import { connect } from 'react-redux'
import { SafeAreaView, View, WebView } from 'react-native';
import { getHeaderBackgroundColor, getColorSelectionList, getPrimaryColor } from '../redux/config';
import { getDescriptionHtml } from '../redux/productDetail';
import ConfigActions from '../redux/config'
class ShopifyInstall extends React.Component {

  navigationStateChangedHandler = (navigation) => {
    if(navigation.url.includes('callback_success')){
        const urls = navigation.url.split("?")
        const params = urls[1]
        const paramList = params.split("&")
        const baseUrls = paramList[0].split("=")
        const baseUrl = baseUrls[1].replace("%3A%2F%2F", "://")
        const access_tokens = paramList[1].split("=")
        const access_token = access_tokens[1]
        this.props.setShopifyStore(baseUrl,access_token)
        this.props.navigation.goBack(null)
    }
  };
  render() {

    return (
      <SafeAreaView style = {{flex:1}}>
          <WebView
              source={{uri: 'https://gentle-thicket-95714.herokuapp.com/shopify/auth/new'}}
              scalesPageToFit={false}
              onNavigationStateChange={this.navigationStateChangedHandler}
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
    setShopifyStore: (baseUrl, access_token) => {
      dispatch(ConfigActions.setShopifyStore(baseUrl, access_token))
    },
  }
}

const ShopifyInstallScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopifyInstall)

export default ShopifyInstallScreen