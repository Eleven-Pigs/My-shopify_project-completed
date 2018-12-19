import { createSwitchNavigator, createAppContainer, createStackNavigator, HeaderBackButton } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import React from 'react';
import ProductDetailScreen from '../screens/ProductDetailScreen'

const ProductStack = createStackNavigator({
  ProductDetailScreen: ProductDetailScreen
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    headerTransparent: true,
  })
})

ProductStack.navigationOptions = {
  headerTransparent: true,
};


const MainStack = createStackNavigator({
  Main: MainTabNavigator,
  Product: ProductStack,
},{
  headerMode: 'none'
})


const switchNavigator =  createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  MainStack
});



export default createAppContainer(switchNavigator)