import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator, HomeNavigator} from './stackNavigator';
import {useSelector} from 'react-redux';

export default function AppNavigator() {
  const userInfo = useSelector(state => state.userInfoReducer);
  const {email, uid} = userInfo?.userInfo || {};
  const isLoggedIn = email && uid;

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
