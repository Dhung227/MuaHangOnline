import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'

import SplashScreen from "../screens/Splash/SplashScreen";
import LoginScreen from "../screens/login_register/LoginScreen";
import RegisterScreen from "../screens/login_register/RegisterScreen";
import InfoScreen from "../screens/account/InfoScreen";
import EditInfoScreen from "../screens/account/EditInfoScreen";

import HomeScreen from '../screens/Home/HomeScreen';
import FavoriteScreen from '../screens/favorite/FavoriteScreen';
import ExploreScreen from '../screens/explore/ExploreScreen';
import CartScreen from '../screens/cart/CartScreen';
import AccountScreen from '../screens/account/AccountScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Trang chủ'
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#53B175',
        inactiveTintColor: '#7C7C7C',
        tabBarStyle: {
          position: 'absolute',
          bottom: 22,
          left: 18,
          right: 18,
          elevation: 0,
          backgroundColor: '#fff',
          borderRadius: 24,
          height: 90,
          ...styles.shadow
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn == 'Trang chủ') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn == 'Danh mục') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (rn == 'Giỏ hàng') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (rn == 'Yêu thích') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (rn == 'Tài khoản') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Danh mục" component={ExploreScreen} />
      <Tab.Screen name="Giỏ hàng" component={CartScreen} />
      <Tab.Screen name="Yêu thích" component={FavoriteScreen} />
      <Tab.Screen name="Tài khoản" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const MyStack = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name='BottomTab' component={MyTabs} />
        <Stack.Screen name='InfoScreen' component={InfoScreen} />
        <Stack.Screen name='EditInfoScreen' component={EditInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#53B175',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
});

export default MyStack;