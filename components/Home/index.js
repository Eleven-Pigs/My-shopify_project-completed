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
    navigationStateChangedHandler = ({url}) => {
        
        if (url.includes('products')) {
            this.WebView.stopLoading();
            this.WebView.goBack();
            const urls = url.split('/');
            const handle = urls[urls.length-1]
            this.props.handleProductClick(handle)
        }else if(url.includes('collections')){
            this.WebView.stopLoading();
            this.WebView.goBack();  
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
                ref={c => {
                    this.WebView = c;
                  }}
                startInLoadingState= {true}
                renderLoading={this.loadingIndicator}
                />

        )
    }

}

