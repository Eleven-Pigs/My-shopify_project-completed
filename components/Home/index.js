import React from 'react';
import { WebView } from 'react-native'
import HomePlaceholder from '../Placeholder/HomePlaceholder';


export class HomeComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = { shopUrl: 'https://aslkdfjlasdfj.myshopify.com/'}
    }
    loadingIndicator = () => {
        return (
            <HomePlaceholder/>
        )
    }

    navigationStateChangedHandler = (navigation) => {
  
        const {url, loading, canGoBack} = navigation
        
        if(url !== this.state.shopUrl){
           this.WebView.stopLoading()
        }
        if (url.includes('products') ) {
            const urls = url.split('/');
            const handle = urls[urls.length-1]
           this.props.handleProductClick(handle)
        }else if(url.includes('collections') ){

            const urls = url.split('/');
            const handle = urls[urls.length-1]
            this.props.handleCollectionClick(handle)
        }
      };


    render() {
        const jsCode = `
            document.getElementById("shopify-section-header").style.display = "none";
            document.getElementById("shopify-section-footer").style.display = "none";
        `;
        return(
                <WebView
                source={{uri: this.props.shopUrl}}
                injectedJavaScript={jsCode}
                javaScriptEnabledAndroid={true}
                onNavigationStateChange={this.navigationStateChangedHandler}
                onMessage={this.onMessage}
                ref={c => {
                    this.WebView = c;
                  }}
                startInLoadingState= {true}
                renderLoading={this.loadingIndicator}
                />

        )
    }

}

