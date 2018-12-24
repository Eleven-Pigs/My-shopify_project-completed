import React from 'react';
import { WebView } from 'react-native'
import ProductDetailImagePlaceholder from '../Placeholder/ProductDetailPlaceholder';

export class HomeComponent extends React.Component {
    constructor(props){
        super(props)
    }
    loadingIndicator = () => {
        return (
            <ProductDetailImagePlaceholder bgColor="grey" animate="fade">

            </ProductDetailImagePlaceholder>
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

        }
      };

    render() {
        const jsCode = `
            document.getElementById("shopify-section-header").style.display = "none";
            document.getElementById("shopify-section-footer").style.display = "none";
            
        `;
        return(
                <WebView
                source={{uri: 'https://aslkdfjlasdfj.myshopify.com/'}}
                
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

