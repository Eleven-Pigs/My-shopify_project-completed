import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import CartCounterContainer  from '../containers/CartCounter'
import PolicyScreen from '../screens/PolicyScreen';
import Icon  from '../containers/Icon'
const HomeStack = createStackNavigator({
  Home: HomeScreen,
},);


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name='md-home'
      icon='Ionicon'
    />
  ),
};
const CollectionStack = createStackNavigator({
  Collection: CollectionScreen,
});


CollectionStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name='search'
      icon='Materialicon'
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
      <Icon
        focused={focused}
        name='shopping-cart'
        icon='Materialicon'
      />  
      <CartCounterContainer/>
    </View>

  ),
};


const AccountStack = createStackNavigator({
  Account: AccountScreen,
  Policy: PolicyScreen
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <Icon
    focused={focused}
    name='account-box'
    icon='Materialicon'
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
    labelStyle: {
      fontSize: 12,
    },
    
  }
  
});

