import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useCallback, useRef} from 'react';
import Header from '../../component/header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import RBBottomSheet from '../../component/rbBottomSheet';
import RenderBottomSheet from './renderChild';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';

export default function Profile() {
  const {userInfo, profileData} = useSelector(state => state.userInfoReducer);
  console.log('🚀 ~ file: index.js:13 ~ Profile ~ userInfo:', userInfo);
  const {
    displayName = '',
    email = '',
    photoURL = '',
    uid = '',
  } = userInfo || {};
  const {username = '', img = ''} = profileData || {};
  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const dispatch = useDispatch();

  const closePopup = useCallback(() => {
    bottomSheetRef?.current?.close();
  }, [bottomSheetRef]);

  const handlefirestore = () => {
    firestore()
      .collection('Users')
      .add({
        name: 'Ada Lovelace',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header
          isbackIconShow={true}
          backClicked={() => navigation.goBack()}
          title={'Profile'}
        />
        <Text onPress={() => handlefirestore()} style={styles.myprofile}>
          My profile
        </Text>
        <View style={styles.flexDir}>
          <Text style={styles.txtStyle}>Personal details</Text>
          <Text
            onPress={() => bottomSheetRef?.current?.open()}
            style={styles.txtStyle}>
            Edit
          </Text>
        </View>

        <View style={styles.headerStyle}>
          <Image
            source={{
              uri: img ? img : photoURL,
            }}
            style={styles.imgStyle}
            resizeMode="center"
          />
          <View style={styles.paddingLeft}>
            {(username || displayName) && (
              <Text style={styles.txtStyle}>{username || displayName}</Text>
            )}
            <Text style={styles.email}>{email}</Text>
            {true && <Text style={styles.phoneNumber}>{'+91 9876867862'}</Text>}
          </View>
        </View>
      </View>
      <RBBottomSheet
        openDuration={300}
        height={270}
        ref={bottomSheetRef}
        draggableIconStyle={styles.draggableIconStyle}
        containerStyle={styles.containerStyle}
        child={
          <RenderBottomSheet
            innerRef={bottomSheetRef}
            closePopup={() => closePopup()}
            navigation={navigation}
            dispatch={dispatch}
            uid={uid}
          />
        }
      />
    </SafeAreaView>
  );
}
