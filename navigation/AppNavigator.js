import { createSwitchNavigator, createAppContainer, createStackNavigator, HeaderBackButton } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import React from 'react';
import ProductDetailScreen from '../screens/ProductDetailScreen'
import ProductListScreen from '../screens/ProductListScreen'
import PaymentScreen from '../screens/PaymentScreen'
import { theme } from '../constants/Theme'

const ProductDetailStack = createStackNavigator({
  ProductDetailScreen: ProductDetailScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={theme.background}/>,
    headerTransparent: true,
  })
})

ProductDetailStack.navigationOptions = {
  headerTransparent: true,
};


const ProductListStack = createStackNavigator({
  ProductListScreen: ProductListScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={theme.background}/>,
    headerTransparent: true,
  })
})

ProductListStack.navigationOptions = {
  headerTransparent: true,
};

const PaymentStack = createStackNavigator({
  PaymentScreen: PaymentScreen,
},{
  
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={theme.background}/>,
    headerTransparent: true,
  })
})

const MainStack = createStackNavigator({
  Main: MainTabNavigator,
  Product: ProductDetailStack,
  ProductList: ProductListStack,
  Payment: PaymentStack
},{
  headerMode: 'none',
})


const switchNavigator =  createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  MainStack
});



export default createAppContainer(switchNavigator)