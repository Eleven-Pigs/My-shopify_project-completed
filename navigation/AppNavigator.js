import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import React from 'react';
import ProductDetailScreen from '../screens/ProductDetailScreen'
import ProductDescriptionScreen from '../screens/ProductDescriptionScreen'
import ProductListScreen from '../screens/ProductListScreen'
import PaymentScreen from '../screens/PaymentScreen'
import LoginScreen from '../screens/LoginScreen'
import ShopifyInstallScreen from '../screens/ShopifyInstallScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AddAddressScreen from '../screens/AddAddressScreen'
import AddressScreen from '../screens/AddressScreen'
import AddNewAddressScreen from '../screens/AddNewAddressScreen'
import HeaderBackButton  from '../containers/HeaderBackButton'
import {Platform} from 'react-native';
import OrderListScreen from '../screens/OrderListScreen'
import OrderDetailScreen from '../screens/OrderDetailScreen'
import ChangeColorScreen from '../screens/ChangeColorScreen'

const ProductDetailStack = createStackNavigator({
  ProductDetailScreen: ProductDetailScreen,
  ProductDescriptionScreen: ProductDescriptionScreen,
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
})

const PaymentStack = createStackNavigator({
  PaymentScreen: PaymentScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton/>,
  })
})
const ChangeColorStack = createStackNavigator({
  ChangeColorScreen: ChangeColorScreen,
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
const ShopifyInstallStack = createStackNavigator({
  ShopifyInstallScreen: ShopifyInstallScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton/>,
    mode: 'modal',
    
  }),
})

const AddressScreenStack = createStackNavigator({
  AddressScreen: AddressScreen,
  AddNewAddressScreen: AddNewAddressScreen,
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: <HeaderBackButton/>,
    mode: 'modal',
    
  }),
})
const OrderScreenStack = createStackNavigator({
  OrderListScreen: OrderListScreen,
  OrderDetailScreen: OrderDetailScreen
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
  AddAddressScreen: AddAdressScreenStack,
  AddressScreen: AddressScreenStack,
  OrderScreen: OrderScreenStack,
  ChangeColorScreen: ChangeColorStack,
  ShopifyInstallStack: ShopifyInstallStack,
},{
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      ...Platform.select({
        android: {
          duration: 0,
        },
        
      }),
        // Set the animation duration time as 0 !!
    },
  }),
})



const switchNavigator =  createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  MainStack
});



export default createAppContainer(switchNavigator)