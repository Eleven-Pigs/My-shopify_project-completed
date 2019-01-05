import React from 'react';
import { SafeAreaView, SectionList, Text, View, TouchableOpacity , Alert} from 'react-native'
import  UserActions  from '../redux/user'
import { connect } from 'react-redux'
import { theme } from '../constants/Theme'
import { getIsLogin } from '../redux/user'


class Account extends React.Component {
  static navigationOptions = {
    title: 'Account',
  };
  componentDidMount(){
    
    
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
      case 'Privacy Policy':
      case 'Refund Policy':
      case 'Terms of Service':
        this.props.navigation.navigate('Policy',{title: title})
        break;
      default:
        // code block
    } 
  }


  render() {
    return (
      <SafeAreaView>
        <SectionList
          renderItem={({item, index, section}) => <TouchableOpacity  key={index} style = {{padding: 10, paddingLeft: 20,backgroundColor: 'white'}} onPress={() => this.onPress(item)}><Text style = {{fontSize: 18,  color: item.title === 'Login' ? theme.background : 'black' }}>{item.title}</Text></TouchableOpacity>}
          renderSectionHeader={() => (
            <View style={{height: 50}}></View>
          )}
          sections={[
            {title: 'Account', data: [{title: this.props.isLogin ? 'Logout': 'Login'}, {title: 'Orders',}, {title: 'Address',}]},
            {title: 'Shop', data: [{title: 'Privacy Policy'},{title: 'Refund Policy'},{title: 'Terms of Service'}]},
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