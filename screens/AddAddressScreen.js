import React from 'react';
import {View, TextInput, Button} from 'react-native'
import { connect } from 'react-redux'
import CartActions from '../redux/cart'
class AddAddress extends React.Component {

  static navigationOptions = {
    title: 'Add Address Screen',
    
  };

  constructor(props){
    super(props)
    this.state = {
      email: '',
      address1: '',
      address2: '',
      province: '',
      city: '',
      country: '',
      lastName: '',
      firstName: '',
      zip: 0,
    }
  }

  onPress = () => {
    const email = this.state.email
    const address = {
      address1: this.state.address1,
      address2: this.state.address2,
      zip: this.state.zip,
      city: this.state.city,
      province: this.state.province,
      country: this.state.country,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
    }
    this.props.addEmailAddress(email, address)
  }

  render() {
    return (
      <View>
        <TextInput
                    style={{height: 40}}
                    placeholder="Email"
                    onChangeText={(text) => this.setState({email: text})}
                    keyboardType="email-address"
                    textContentType="emailAddress"
        />
        <TextInput
                    style={{height: 40}}
                    placeholder="Address 1"
                    onChangeText={(text) => this.setState({address1: text})}
                    textContentType="streetAddressLine1"
        />
        <TextInput
                    style={{height: 40}}
                    placeholder="Address 2"
                    onChangeText={(text) => this.setState({address2: text})}
                    textContentType="streetAddressLine2"
        />
        <TextInput
                    style={{height: 40}}
                    placeholder="Zip / Postal Code"
                    onChangeText={(text) => this.setState({zip: text})}
                    textContentType="postalCode"
        />
        <TextInput
                    style={{height: 40}}
                    placeholder="City"
                    onChangeText={(text) => this.setState({city: text})}
                    textContentType="addressCity"
        />
        <TextInput
                    style={{height: 40}}
                    placeholder="Province / State"
                    onChangeText={(text) => this.setState({province: text})}
                    textContentType="addressState"
        />


                <TextInput
                    style={{height: 40}}
                    placeholder="Country"
                    onChangeText={(text) => this.setState({country: text})}
                    textContentType="countryName"
        />
        <TextInput
                    style={{height: 40}}
                    placeholder="First Name"
                    onChangeText={(text) => this.setState({firstName: text})}
                    textContentType="name"
        />
        <TextInput
                    style={{height: 40}}
                    placeholder="Last Name"
                    onChangeText={(text) => this.setState({lastName: text})}
                    textContentType="name"
        />

        <Button onPress={this.onPress} title="Add"/>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addEmailAddress: (email,address) => {
      dispatch(CartActions.requestAddEmailAddress(email,address))
    },
  }
}

const AddAddressScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAddress)


export default AddAddressScreen