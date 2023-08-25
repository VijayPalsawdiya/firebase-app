import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
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
import {Button} from '../../component/buttons';

export default function Profile() {
  const {userInfo} = useSelector(state => state.userInfoReducer);
  const {email = '', uid = ''} = userInfo || {};
  const [isReload, setIsReload] = useState(false);
  const [savedData, setSavedData] = useState(false);

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
              {savedData?.userName ? savedData?.userName : 'John Doe'}
            </Text>

            <Text style={styles.email}>{email}</Text>
            <Text style={styles.email}>{savedData?.userAddress}</Text>
            <Text style={styles.phoneNumber}>{savedData?.userNumber}</Text>
          </View>
        </View>
        {listData?.map(itm => {
          return (
            <TouchableOpacity style={[styles.headerStyle, styles.paddingVer]}>
              <Text style={styles.extratxtStyle}>{itm?.title}</Text>
              <Image style={styles.arrowLeft} source={ICON.Arrowleft} />
            </TouchableOpacity>
          );
        })}
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
            photoURL={savedData.imageData}
          />
        }
      />
    </SafeAreaView>
  );
}
