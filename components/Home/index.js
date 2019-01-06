import React from 'react';
import { WebView } from 'react-native'
import HomePlaceholder from '../Placeholder/HomePlaceholder';

export class HomeComponent extends React.Component {
    constructor(props){
        super(props)
    }
    loadingIndicator = () => {
        return (
            <HomePlaceholder/>
        )
    }
    componentWillUnmount(){
        this.WebView.goBack();
    }

    navigationStateChangedHandler = (navigation) => {
  
        const {url, loading} = navigation

      };

    onMessage = (event) => {
        const url =  event.nativeEvent.data

        if (url.includes('products')) {
            this.WebView.goBack()
            const urls = url.split('/');
            const handle = urls[urls.length-1]
            this.props.handleProductClick(handle)
        }else if(url.includes('collections')){
            this.WebView.goBack()
            const urls = url.split('/');
            const handle = urls[urls.length-1]
            this.props.handleCollectionClick(handle)

        }
    }
    render() {
        const jsCode = `
      
            window.onclick = function(e) { window.postMessage(e.target); return false;};
            document.getElementById("shopify-section-header").style.display = "none";
            document.getElementById("shopify-section-footer").style.display = "none";
            

            (function() {
                var originalPostMessage = window.postMessage;
              
                var patchedPostMessage = function(message, targetOrigin, transfer) { 
                  originalPostMessage(message, targetOrigin, transfer);
                };
              
                patchedPostMessage.toString = function() { 
                  return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage'); 
                };
              
                window.postMessage = patchedPostMessage;
              })();
            
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

