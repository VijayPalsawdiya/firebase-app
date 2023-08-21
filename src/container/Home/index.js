import {View, Text, SafeAreaView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {SignOutFunc} from '../../firebase';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  // Handle user state changes
  function onAuthStateChanged(_user) {
    setUser(_user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth()?.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const Sigout = () => {
    SignOutFunc();
    navigation.replace('Signup');
  };

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
      <View style={{paddingHorizontal: 16}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Welcome {user?.email}</Text>
          <Text onPress={() => SignOutCallBack()}>SignOut</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
