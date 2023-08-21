import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../container/onBoarding';
import SignUpScreen from '../container/auth/signUp';
import SigninScreen from '../container/auth/signIn';
import ForgetPassword from '../container/auth/forgetPassword';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="OnBoarding">
    <Stack.Screen name="OnBoarding" component={OnBoarding} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen name="Signin" component={SigninScreen} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
  </Stack.Navigator>
);
