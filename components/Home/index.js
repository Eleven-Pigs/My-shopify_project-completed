import React from 'react';
import { WebView } from 'react-native'
import HomePlaceholder from '../Placeholder/HomePlaceholder';

export class HomeComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = { key: 1, scroll: 0, sx: 0, sy: 0}
    }
    loadingIndicator = () => {
        return (
            <HomePlaceholder/>
        )
    }

    navigationStateChangedHandler = (navigation) => {
  
        const {url} = navigation
        console.log(navigation)
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
        const coordinate = event.split(',');
        setTimeout(() => {this.setState({key: this.state.key + 1, sx: coordinate[0], sy: coordinate[1]})}, 400);
        
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
                window.postMessage(sx.toString() + ","+ sy.toString());
              });
            document.getElementById("shopify-section-header").style.display = "none";
            document.getElementById("shopify-section-footer").style.display = "none";

        `;
        return(
                <WebView
                key = {this.state.key}
                source={{uri: this.props.shopUrl}}
                injectedJavaScript={jsCode}
                javaScriptEnabledAndroid={true}
                onNavigationStateChange={this.navigationStateChangedHandler}
                onMessage={(event) => this.onMessage(event.nativeEvent.data)}
                
                ref={c => {
                    this.WebView = c;
                  }}
                startInLoadingState= {true}
                renderLoading={this.loadingIndicator}
                />

        )
    }

}

