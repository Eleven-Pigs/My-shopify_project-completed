import React from 'react';
import { SafeAreaView, SectionList, Text, View, TouchableOpacity , Alert} from 'react-native'
import  UserActions  from '../redux/user'
import { connect } from 'react-redux'
import { theme } from '../constants/Theme'
import { getIsLogin } from '../redux/user'
import { getPrimaryColor, getHeaderBackgroundColor, getHeaderBackIconColor } from '../redux/config';


class Account extends React.Component {
  static navigationOptions =( { navigation } ) => {
    return(
      {
        title: 'Account',
        headerStyle: {
          backgroundColor: navigation.state.params ? navigation.state.params.color : 'white',
        },
      }
    )
  }
  componentDidMount(){
    this.props.navigation.setParams({ color: this.props.headerBackroundColor, headerContentColor: this.props.headerContentColor});
  }
  onPress = ({title}) => {
    switch(title) {
      case 'Login':
        this.props.navigation.navigate('LoginScreen')
        break;
      case 'Logout':
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            {text: 'Yes', onPress: () => this.props.logout(), style: 'cancel'},
            {text: 'No', onPress: () => console.log('no')},
          ],
          { cancelable: false }
        )
        break;
      case 'Orders':
          if(this.props.isLogin){
            this.props.navigation.navigate('OrderScreen')
          }else{
            this.props.navigation.navigate('LoginScreen')
          }
        break;
      case 'Address':
        if(this.props.isLogin){
          this.props.navigation.navigate('AddressScreen')
        }else{
          this.props.navigation.navigate('LoginScreen')
        }
        break;
      case 'Change Theme Color':
        this.props.navigation.navigate('ChangeColorScreen')
        break
      case 'Privacy Policy':
      case 'Refund Policy':
      case 'Terms of Service':
        this.props.navigation.navigate('Policy',{title: title})
        break;
      case 'Preview Shopify Shop':
        this.props.navigation.navigate('ShopifyInstallScreen')
      break;
      default:
        // code block
    } 
  }


  render() {
    return (
      <SafeAreaView>
        <SectionList
          renderItem={({item, index, section}) => <TouchableOpacity  key={index} style = {{padding: 10, paddingLeft: 20,backgroundColor: 'white'}} onPress={() => this.onPress(item)}><Text style = {{fontSize: 18,  color: item.title === 'Login' ? this.props.primaryColor : 'black' }}>{item.title}</Text></TouchableOpacity>}
          renderSectionHeader={() => (
            <View style={{height: 30}}></View>
          )}
          sections={[
            {title: 'Account', data: [{title: this.props.isLogin ? 'Logout': 'Login'}, {title: 'Orders',}, {title: 'Address',}]},
            {title: 'Shop', data: [{title: 'Privacy Policy'},{title: 'Refund Policy'},{title: 'Terms of Service'}]},
            {title: 'Customize', data: [{title: 'Preview Shopify Shop'},{title: 'Change Theme Color'}]},
          ]}
          keyExtractor={(item, index) => item + index}
          style = {{backgroundColor: theme.listBackground, height: '100%'}}
          SectionSeparatorComponent={() => <View style ={{borderWidth:0.5, borderColor: 'lightgrey'}}></View>}
          ItemSeparatorComponent={() =><View style ={{backgroundColor: 'white'}}><View style={{marginLeft: 20,borderWidth:0.5, borderColor: 'lightgrey' }}></View></View>}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLogin: getIsLogin(state),
    primaryColor: getPrimaryColor(state),
    headerBackroundColor: getHeaderBackgroundColor(state),
    headerContentColor: getHeaderBackIconColor(state)
  }
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(UserActions.logout())
    },
  }
}

const AccountScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)


export default AccountScreen