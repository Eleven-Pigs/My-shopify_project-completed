import React from 'react';
import { WebView, View } from 'react-native'
import HomePlaceholder from '../Placeholder/HomePlaceholder';

export class HomeComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = { key: 1, scroll: 0, sx: 0, sy: 0, showLoading: false}
    }
    loadingIndicator = () => {
        return (
            <HomePlaceholder/>
        )
    }

    shouldStartLoadWithRequest = (navigator) => {
        const url = navigator.url.replace(/\/+$/, "");
        if(url != this.props.shopUrl){
            if (url.includes('products') ) {
                const urls = url.split('/');
                const handle = urls[urls.length-1]
                this.props.handleProductClick(handle)
            }else if(url.includes('collections') ){
                const urls = url.split('/');
                const handle = urls[urls.length-1]
                this.props.handleCollectionClick(handle)
            }
            return false
        }else{
            return true
        }
      };

    componentDidUpdate(prevProps){
        if(prevProps.shopUrl != this.props.shopUrl){
            this.setState({key: this.state.key + 1})
        }
    }


    render() {
        const jsCode = `
            document.getElementById("shopify-section-header").style.display = "none";
            document.getElementById("shopify-section-footer").style.display = "none";

        `;
        
        return(
                <View style={{height:'100%'}}>
                { this.state.showLoading && this.loadingIndicator()}
                <WebView
                key = {this.state.key}
                source={{uri: this.props.shopUrl}}
                injectedJavaScript={jsCode}
                javaScriptEnabledAndroid={true}
                onShouldStartLoadWithRequest={this.shouldStartLoadWithRequest}
                startInLoadingState={true}
                renderLoading={this.loadingIndicator}
                ref={c => {
                    this.WebView = c;
                  }}
                />

                </View>

        )
        
    }

}

