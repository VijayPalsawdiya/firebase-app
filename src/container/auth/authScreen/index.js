import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import SignUpScreen from '../signUp';
import SigninScreen from '../signIn';
import {ICON} from '../../../assets';
import styles from './styles';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={ICON.ChefhatLogo}
          style={styles.chefLogo}
          resizeMode="center"
        />
        <Text style={styles.veganText}>vegan</Text>
        <View style={styles.tabContainer}>
          <View>
            <TouchableOpacity
              style={styles.bttnStyle}
              onPress={() => setIsLogin(true)}>
              <Text style={styles.tabText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.bttnStyle}
              onPress={() => setIsLogin(false)}>
              <Text style={styles.tabText}>Sign-up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.indicator(isLogin)} />
      </View>
      <View style={styles.bottomContainer}>
        {isLogin ? <SigninScreen /> : <SignUpScreen />}
      </View>
    </View>
  );
};
export default AuthScreen;
