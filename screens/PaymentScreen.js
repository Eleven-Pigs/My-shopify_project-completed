import React from 'react';
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { PaymentComponent } from '../components/Payment'
import { getWebUrl } from '../redux/cart'
class Payment extends React.Component {
  static navigationOptions = {

  };

  render() {
    return (
        <SafeAreaView style = {{flex:1}}>
            <PaymentComponent url={this.props.url}/>
        </SafeAreaView>
    );
  }

}

const mapStateToProps = state => {
  return {
      url: getWebUrl(state)
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