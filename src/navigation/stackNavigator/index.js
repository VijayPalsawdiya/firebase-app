import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import OnBoarding from '../../container/onBoarding';
import SignUpScreen from '../../container/auth/signUp';
import SigninScreen from '../../container/auth/signIn';
import ForgetPassword from '../../container/auth/forgetPassword';
import AuthScreen from '../../container/auth/authScreen';
import Home from '../../container/Home';

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
    </Stack.Navigator>
  );
};
