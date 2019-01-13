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

    navigationStateChangedHandler = (navigation) => {
  
        const url = navigation.url.replace(/\/+$/, "");
        const loading = navigation.loading
        console.log(navigation)

       if(!loading){
           this.setState({showLoading: false})
       }

        if(url != this.props.shopUrl){
           this.setState({key: this.state.key + 1})
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
    onMessage = (event) => {
        
        console.log(event)
        if(event.includes("Opal") && event.includes(",")){
            const coordinate = event.split(',');
            console.log('dddd')
            this.setState({ sx: coordinate[0], sy: coordinate[1], showLoading: true})
        }

        
    }



    render() {
        const jsCode = `
            window.scrollTo(${this.state.sx}, ${this.state.sy});
                    window.addEventListener("beforeunload", function (event) {
                        var sx, sy, d = document,
                        r = d.documentElement,
                        b = d.body;
                        sx = r.scrollLeft || b.scrollLeft || 0;
                        sy = r.scrollTop || b.scrollTop || 0;
                        alert('aaaa');
                        window.postMessage(sx.toString() + ","+ sy.toString() + ",Opal");
                      });  
                  window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');

                
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
                onNavigationStateChange={this.navigationStateChangedHandler}
                onMessage={(event) => this.onMessage(event.nativeEvent.data)}
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

