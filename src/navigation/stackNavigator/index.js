import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import OnBoarding from '../../container/onBoarding';
import SignUpScreen from '../../container/auth/signUp';
import SigninScreen from '../../container/auth/signIn';
import ForgetPassword from '../../container/auth/forgetPassword';
import AuthScreen from '../../container/auth/authScreen';
import Home from '../../container/home';
import Profile from '../../container/profile';
import CartScreen from '../../container/cart';
import ProductDetails from '../../container/productDetails';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="AuthScreen">
      {/* <Stack.Screen name="OnBoarding" component={OnBoarding} /> */}
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} /> */}
    </Stack.Navigator>
  );
};

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="cartScreen" component={CartScreen} />
      <Stack.Screen name="productDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};
