import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator, HomeNavigator} from './stackNavigator';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const userInfo = useSelector(state => state.userInfoReducer);
  const {email = '', uid = ''} = userInfo || {};
  const isLoggedIn = email && uid && true;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={!isLoggedIn ? 'AuthScreen' : 'HomeNavigator'}>
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
