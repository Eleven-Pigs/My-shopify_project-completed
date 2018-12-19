import React from 'react';
import { Title, StyledImage } from './style'
import { Main, Center } from '../Styled'
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
        
        if (url.includes('collections') || url.includes('products')) {
          this.WebView.stopLoading();
          this.WebView.goBack();
          this.props.handleProductClick()
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

