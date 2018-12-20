import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { theme } from '../constants/Theme'
import Ionicons from '../components/Reusable/TabBarIcon/Ionicons';
import Materialicons from '../components/Reusable/TabBarIcon/Materialicons';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import CollectionScreen from '../screens/CollectionScreen';

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
},);


CollectionStack.navigationOptions = {
  tabBarLabel: 'Collection',
  tabBarIcon: ({ focused }) => (
    <Materialicons
      focused={focused}
      name='collections'
    />
  ),
};


const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <Ionicons
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  CollectionStack,
  LinksStack,
},{
  tabBarOptions: {
    activeTintColor: theme.secondary.dark,
    inactiveTintColor: theme.secondary.light,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: theme.background,
    },
  }
  
});

