import React from 'react';
import { WebView } from 'react-native'

export class PaymentComponent extends React.Component {
    constructor(props){
        super(props)
    }
    navigationStateChangedHandler = ({url}) => {
        
        if (url.includes('checkouts') && url.includes('thank_you')) {
            this.props.paymentCompleted()
        }else{

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

