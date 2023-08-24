import {View, Text, SafeAreaView, Alert, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {SignOutFunc} from '../../firebase';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {resetUserInfoData} from '../../redux/reducers/userInfo';
import Header from '../../component/header';

export default function Home() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Handle user state changes
  function onAuthStateChanged(_user) {
    if (!_user) {
      dispatch(resetUserInfoData());
    }
    setUser(_user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const Sigout = useCallback(async () => {
    SignOutFunc();
  }, []);

  const SignOutCallBack = () => {
    Alert.alert(
      'Logout',
      'Are you sure? you want to logout?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => Sigout(),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title={'Home'} />
        <View style={styles.headerStyle}>
          <Text onPress={() => navigation.navigate('Profile')}>
            Welcome {user?.email}
          </Text>
          <Text onPress={() => SignOutCallBack()}>SignOut</Text>
        </View>
        <Text>Delicious food for you</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: 16},
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
});
