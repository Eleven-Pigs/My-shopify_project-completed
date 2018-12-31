import React from 'react';
import { Platform, View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { theme } from '../constants/Theme'
import Ionicons from '../components/Reusable/TabBarIcon/Ionicons';
import Materialicons from '../components/Reusable/TabBarIcon/Materialicons';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import CartCounterContainer  from '../containers/CartCounter'
const HomeStack = createStackNavigator({
  Home: HomeScreen,
},);


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Ionicons
      focused={focused}
      name='md-home'
    />
  ),
};
const CollectionStack = createStackNavigator({
  Collection: CollectionScreen,
});


CollectionStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <Materialicons
      focused={focused}
      name='search'
    />
  ),
};

const ShoppingCartStack = createStackNavigator({
  ShoppingCart: ShoppingCartScreen,
},);


ShoppingCartStack.navigationOptions = {
  tabBarLabel: 'Shopping Cart',
  tabBarIcon: ({ focused }) => (
    <View>
    <Materialicons
      focused={focused}
      name='shopping-cart'
    />
    <CartCounterContainer/>
    </View>

  ),
};


const AccountStack = createStackNavigator({
  Account: AccountScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <Materialicons
      focused={focused}
      name='account-box'
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  CollectionStack,
  ShoppingCartStack,
  AccountStack,
},{
  lazy: false,
  tabBarOptions: {
    showLabel: false,
    activeTintColor: theme.background,
    inactiveTintColor: theme.iconLight,
    labelStyle: {
      fontSize: 12,
    },
    
  }
  
});

