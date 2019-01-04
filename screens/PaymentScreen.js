import React from 'react';
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { PaymentComponent } from '../components/Payment'
import { getWebUrl } from '../redux/cart'
import { getAccessToken } from '../redux/user'

class Payment extends React.Component {
  static navigationOptions = {
    headerTitle: 'Checkout'
  };

  paymentCompleted = () => {
    this.props.navigation.goBack(null)
  }

  render() {
    return (
        <SafeAreaView style = {{flex:1}}>
            <PaymentComponent userAccessToken={this.props.userAccessToken} url={this.props.url} paymentCompleted={this.paymentCompleted}/>
        </SafeAreaView>
    );
  }

}

const mapStateToProps = state => {
  return {
      url: getWebUrl(state),
      userAccessToken: getAccessToken(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

const PaymentScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment)

export default PaymentScreen