/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthNavigator} from './src/navigation';

const App = () => {
  // const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        {AuthNavigator()}
        {/* <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="OnBoarding">
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator> */}
      </NavigationContainer>
      <Toast />
    </>
  );
};
export default App;
