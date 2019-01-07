import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux'
import UserActions, { getErrorText, getIsCreatingAddress, getCreatingAddressError, getIsCreatingAddressSuccess } from '../redux/user'
import { TextField } from 'react-native-material-textfield';
import { getPrimaryColor } from '../redux/config';

class AddAddress extends React.Component {

  static navigationOptions = {
    title: 'Address',

  };

  constructor(props) {
    super(props)
    this.state = {
      address1: 'a',
      address2: 'a',
      province: 'perlis',
      city: 'kangar',
      country: 'malaysia',
      lastName: 'last',
      firstName: 'first',
      zip: '01000',
      emailError: '',
      address1Error: '',
      address2Error: '',
      provinceError: '',
      cityError: '',
      countryError: '',
      lastNameError: '',
      firstNameError: '',
      zipError: '',
    }
  }

  onPress = () => {
    const {
      address1,
      address2,
      zip,
      city,
      province,
      country,
      lastName,
      firstName,
    } = this.state
    const address = {
      address1: address1,
      address2: address2,
      zip: zip,
      city: city,
      province: province,
      country: country,
      lastName: lastName,
      firstName: firstName,
    }


    if (address1.length > 0 && address2.length > 0 && zip.length > 0 && city.length > 0 && province.length > 0 && country.length > 0 && firstName.length > 0 && lastName.length > 0) {
      this.props.createUserAddress(address)
    } else {
      this.setState({
        address1Error: '',
        address2Error: '',
        provinceError: '',
        cityError: '',
        countryError: '',
        lastNameError: '',
        firstNameError: '',
        zipError: '',
      })
      if (address1.length === 0) {
        this.setState({ address1Error: 'Please fill in the address correctly' })
      }
      if (address2.length === 0) {
        this.setState({ address2Error: 'Please fill in the address correctly' })
      }
      if (zip.length === 0) {
        this.setState({ zipError: 'Please fill in the zip / postcode correctly' })
      }
      if (city.length === 0) {
        this.setState({ cityError: 'Please fill in the city correctly' })
      }
      if (province.length === 0) {
        this.setState({ provinceError: 'Please fill in the province / state correctly' })
      }
      if (country.length === 0) {
        this.setState({ countryError: 'Please fill in the country correctly' })
      }
      if (lastName.length === 0) {
        this.setState({ lastNameError: 'Please fill in the last name correctly' })
      }
      if (firstName.length === 0) {
        this.setState({ firstNameError: 'Please fill in the first name correctly' })
      }
    }

  }

  _renderAddressInput = () => {
    return (
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <TextField
          label='Address 1'
          onChangeText={(text) => this.setState({ address1: text })}
          textContentType="streetAddressLine1"
          error={this.state.address1Error}
        />
        <TextField
          label='Address 2'
          onChangeText={(text) => this.setState({ address2: text })}
          textContentType="streetAddressLine2"
          error={this.state.address2Error}
        />
        <TextField
          label='Zip / Postal Code'
          onChangeText={(text) => this.setState({ zip: text })}
          textContentType="postalCode"
          error={this.state.zipError}
        />
        <TextField
          label='City'
          onChangeText={(text) => this.setState({ city: text })}
          textContentType="addressCity"
          error={this.state.cityError}
        />
        <TextField
          label='Province / State'
          onChangeText={(text) => this.setState({ province: text })}
          textContentType="addressState"
          error={this.state.provinceError}
        />
        <TextField
          label='Country'
          onChangeText={(text) => this.setState({ country: text })}
          textContentType="countryName"
          error={this.state.countryError}
        />
        <TextField
          label='First Name'
          onChangeText={(text) => this.setState({ firstName: text })}
          textContentType="name"
          error={this.state.firstNameError}
        />
        <TextField
          label='Last Name'
          onChangeText={(text) => this.setState({ lastName: text })}
          textContentType="name"
          error={this.state.lastNameError}
        />
      </View>
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.isCreatingAddressSuccess === true && prevProps.isCreatingAddressSuccess === false) {
      this.props.navigation.goBack()
      this.props.resetRequestCreateUserAddress()
    } else if (this.props.creatingAddressError === true && prevProps.creatingAddressError === false) {
      Alert.alert(
        'Sorry',
        this.props.errorText,
        [
          { text: 'Okay', onPress: () => console.log('nothing') },
        ],
        { cancelable: false }
      )
      this.props.resetRequestCreateUserAddress()
    }
   

  }

  render() {
    return (
      <ScrollView style={{ textAlign: 'center', paddingBottom: 80 }}>
        {this._renderAddressInput()}
        <TouchableOpacity disabled={this.props.isCreatingAddress} style={{ marginBottom: 80, marginTop: 20, width: '50%', alignSelf: 'center', padding: 10, backgroundColor: this.props.primaryColor }} onPress={this.onPress}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>CREATE</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    primaryColor: getPrimaryColor(state),
    isCreatingAddress: getIsCreatingAddress(state),
    creatingAddressError: getCreatingAddressError(state),
    isCreatingAddressSuccess: getIsCreatingAddressSuccess(state),
    errorText: getErrorText(state)
  }
}



const mapDispatchToProps = dispatch => {
  return {
    createUserAddress: (address) => {
      dispatch(UserActions.requestCreateUserAddress(address))
    },
    resetRequestCreateUserAddress: () => {
      dispatch(UserActions.resetRequestCreateUserAddress())
    }
  }
}

const AddAddressScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAddress)


export default AddAddressScreen