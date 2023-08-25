/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import {Platform, StatusBar} from 'react-native';

const App = () => {
  useEffect(() => {
    SplashScreen?.hide();
  }, []);
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

      <Provider store={store}>
        <AppNavigator />
        <Toast />
      </Provider>
    </>
  );
};
export default App;
