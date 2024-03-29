import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from '../../component/header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import RBBottomSheet from '../../component/rbBottomSheet';
import RenderBottomSheet from './renderChild';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import {showToast} from '../../utils/helper';
import {ICON} from '../../assets';
import {listData} from './logics';
import Icon from 'react-native-vector-icons/Ionicons';
import {SignOutFunc} from '../../firebase';
import {resetUserInfoData} from '../../redux/reducers/userInfo';
import auth from '@react-native-firebase/auth';

export default function Profile() {
  const {userInfo} = useSelector(state => state.userInfoReducer);
  const {email = '', uid = ''} = userInfo || {};
  const [isReload, setIsReload] = useState(false);
  const [savedData, setSavedData] = useState({});
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot?.id) {
            setSavedData(documentSnapshot.data());
          }
        });
      });
  }, [isReload]);

  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const dispatch = useDispatch();

  const closePopup = useCallback(() => {
    bottomSheetRef?.current?.close();
  }, [bottomSheetRef]);

  const handlefirestore = userData => {
    firestore()
      .collection('Users')
      .doc(uid)
      .set(userData)
      .then(itm => {
        console.log('User added! via docID', itm);
        showToast('success', 'Details Saved', '');
        setIsReload(Prev => !Prev);
      });
  };

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
        <Header
          isbackIconShow={true}
          backClicked={() => navigation.goBack()}
          title={'Profile'}
        />
        <Text style={styles.myprofile}>My profile</Text>
        <View style={styles.flexDir}>
          <Text style={styles.extratxtStyle}>Personal details</Text>
          <Text
            onPress={() => bottomSheetRef?.current?.open()}
            style={styles.extratxtStyle}>
            Edit
          </Text>
        </View>

        <View style={styles.headerStyle}>
          <Image
            source={
              savedData?.imageData
                ? {
                    uri: `data:${savedData.imageData?.mime};base64,${savedData.imageData?.data}`,
                  }
                : ICON.VeganLogo
            }
            style={styles.imgStyle}
          />
          <View style={styles.paddingLeft}>
            <Text style={styles.txtStyle}>
              <Icon name="person-outline" size={16} color="#900" />
              {'  '}
              {savedData?.userName ? savedData?.userName : 'John Doe'}
            </Text>

            <Text style={styles.email}>
              <Icon name="mail-outline" size={16} color="#900" />
              {'  '}
              {email}
            </Text>
            <Text style={styles.email}>
              <Icon name="earth-outline" size={16} color="#900" />
              {'  '}
              {savedData?.userAddress}
            </Text>
            <Text style={styles.phoneNumber}>
              <Icon name="call" size={16} color="#900" />
              {'  '}+{savedData?.userNumber}
            </Text>
          </View>
        </View>
        {listData?.map(itm => {
          return (
            <TouchableOpacity
              key={itm?.id}
              style={[styles.headerStyle, styles.paddingVer]}>
              <Text style={styles.extratxtStyle}>
                <Icon name={itm?.iconName} size={16} color="#900" />
                {'  '}
                {itm?.title}
              </Text>
              <Icon name="chevron-forward-outline" size={16} color="#900" />
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          onPress={() => SignOutCallBack()}
          style={[styles.headerStyle, styles.paddingTop]}>
          <Text style={styles.extratxtStyle}>
            {'  '}
            {'Sign Out'}
            {'  '}
          </Text>
          <Icon name="log-out-outline" size={18} color="#900" />
        </TouchableOpacity>
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
            submitData={itm => handlefirestore(itm)}
            navigation={navigation}
            dispatch={dispatch}
            photoURL={savedData?.imageData}
            userName={savedData?.userName}
            userAddress={savedData?.userAddress}
            userNumber={savedData?.userNumber}
          />
        }
      />
    </SafeAreaView>
  );
}
