import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import React from 'react';
import ProductDetailScreen from '../screens/ProductDetailScreen'
import ProductListScreen from '../screens/ProductListScreen'
import PaymentScreen from '../screens/PaymentScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AddAddressScreen from '../screens/AddAddressScreen'
import { theme } from '../constants/Theme'
import HeaderBackButton  from '../containers/HeaderBackButton'

const ProductDetailStack = createStackNavigator({
  ProductDetailScreen: ProductDetailScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerTitle: 'Product Detail',
    headerLeft: <HeaderBackButton/>,
    headerTransparent: false,
    headerStyle: {
   
    },
    headerTitleStyle: {
  
    },
  })
})


const ProductListStack = createStackNavigator({
  ProductListScreen: ProductListScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton />,
  })
})

const PaymentStack = createStackNavigator({
  PaymentScreen: PaymentScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton/>,
  })
})

const AddAdressScreenStack = createStackNavigator({
  AddAddressScreen: AddAddressScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton/>,
  })
})

const LoginStack = createStackNavigator({
  LoginScreen: LoginScreen,
  RegisterScreen: RegisterScreen
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton/>,
    mode: 'modal',
    
  }),
})




const MainStack = createStackNavigator({
  Main: MainTabNavigator,
  Product: ProductDetailStack,
  ProductList: ProductListStack,
  Payment: PaymentStack,
  Login: LoginStack,
  AddressScreen: AddAdressScreenStack,
},{
  headerMode: 'none',
})



const switchNavigator =  createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  MainStack
});



export default createAppContainer(switchNavigator)