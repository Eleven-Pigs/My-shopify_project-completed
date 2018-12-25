import React from 'react';
import { WebView } from 'react-native'

export class PaymentComponent extends React.Component {
    constructor(props){
        super(props)
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
        return(
                <WebView
                source={{uri: this.props.url}}
                javaScriptEnabledAndroid={true}
                ref={c => {
                    this.WebView = c;
                  }}
                />

        )
    }

}

