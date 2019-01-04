import React from 'react';
import { ScrollView, SafeAreaView, SectionList, Text, View, TouchableOpacity , Alert} from 'react-native'
import { theme } from '../constants/Theme'
import { connect } from 'react-redux'
import { getPrivacyPolicy } from '../redux/shop'
import { SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../config/application'


class Policy extends React.Component {
  static navigationOptions = ({navigation}) =>  ({
    title: 'd',
  });
  constructor(props){
    super(props)
    this.state = {
      body: ''
    }
  }
  componentDidMount(){
    if(this.props.navigation.getParam('title') === 'Privacy Policy'){
      this.getPrivacyPolicy()
    }
    switch (this.props.navigation.getParam('title') ){
      case 'Privacy Policy':
        this.getPrivacyPolicy()
        break;
      case 'Refund Policy':
        this.getRefundPolicy()
        break;
      case 'Terms of Service':
        this.getTermsOfService()
        break;
    }
    
    
  }

  getPrivacyPolicy = () => {
    fetch('https://aslkdfjlasdfj.myshopify.com/api/graphql', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: `
      {
        shop {
          privacyPolicy{
          body
          title
          }
        }
      }
    `,
  }).then((response) => response.json())
  .then((responseJson) => {
    this.setState({body: responseJson.data.shop.privacyPolicy.body})
  })
  }


  getRefundPolicy = () => {
    fetch('https://aslkdfjlasdfj.myshopify.com/api/graphql', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: `
      {
        shop {
          refundPolicy{
          body
          title
          }
        }
      }
    `,
  }).then((response) => response.json())
  .then((responseJson) => {
    this.setState({body: responseJson.data.shop.refundPolicy.body})
  })
  }

  getTermsOfService = () => {
    fetch('https://aslkdfjlasdfj.myshopify.com/api/graphql', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: `
      {
        shop {
          termsOfService{
          body
          title
          }
        }
      }
    `,
  }).then((response) =>  response.json())
  .then((responseJson) => {
    this.setState({body: responseJson.data.shop.termsOfService.body})
  })
  }


  render() {
   
    return (
      <SafeAreaView>
            <ScrollView>
              <Text>{this.state.body}</Text>
            </ScrollView>
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
  return {
  
  }
}


const mapDispatchToProps = dispatch => {
  return {}
}

const PolicyScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Policy)
export default PolicyScreen