import { createSwitchNavigator, createAppContainer, createStackNavigator, HeaderBackButton } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import React from 'react';
import ProductDetailScreen from '../screens/ProductDetailScreen'
import ProductListScreen from '../screens/ProductListScreen'
import PaymentScreen from '../screens/PaymentScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import { theme } from '../constants/Theme'

const ProductDetailStack = createStackNavigator({
  ProductDetailScreen: ProductDetailScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={theme.background}/>,
    headerTransparent: true,
  })
})


const ProductListStack = createStackNavigator({
  ProductListScreen: ProductListScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={theme.iconDark}/>,
  })
})

const PaymentStack = createStackNavigator({
  PaymentScreen: PaymentScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={theme.background}/>,
    headerTransparent: true,
  })
})

const LoginStack = createStackNavigator({
  LoginScreen: LoginScreen,
  RegisterScreen: RegisterScreen
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={theme.background}/>,
    headerTransparent: true,
    mode: 'modal',
    headerMode: 'none',
    
  }),
})




const MainStack = createStackNavigator({
  Main: MainTabNavigator,
  Product: ProductDetailStack,
  ProductList: ProductListStack,
  Payment: PaymentStack,
  Login: LoginStack,
},{
  headerMode: 'none',
})



const switchNavigator =  createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  MainStack
});



export default createAppContainer(switchNavigator)