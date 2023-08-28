import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import InputField from '../../../component/inputField';
import {styles} from './styles';
import {ICON} from '../../../assets';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useFormik} from 'formik';
import {updateProfileSchema} from '../../../utils/formik/signUp';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR_SECONDARY} from '../../../utils/colors';
import {useSelector} from 'react-redux';

export default function RenderBottomSheet(props) {
  const {closePopup, submitData, photoURL} = props || {};
  const [imgSelected, setImgSelected] = useState('');
  const {userInfo, profileData} = useSelector(state => state.userInfoReducer);

  const {displayName = ''} = userInfo || {};
  const initialValues = {
    username: '',
    mobileNumber: '',
    address: '',
    imgurl: imgSelected,
  };

  const {handleChange, handleSubmit, values, errors, touched} = useFormik({
    validationSchema: updateProfileSchema,
    initialValues: initialValues,
    onSubmit: userValues => {
      handleSignUpFunc({
        userValues,
        imgData: imgSelected,
      });
      closePopup();
    },
  });

  const handleSignUpFunc = useCallback(
    _userValues => {
      const {imgData, userValues} = _userValues || {};
      const {address = '', mobileNumber = '', username = ''} = userValues || {};
      submitData &&
        submitData({
          imageData: imgData ? imgData : photoURL ? photoURL : '',
          userName: username,
          userNumber: mobileNumber,
          userAddress: address,
        });
    },
    [submitData, photoURL],
  );
  const onImageSelect = () => {
    ImageCropPicker?.openPicker({
      height: 80,
      width: 80,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setImgSelected(image);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.updateStyle}>Update Profile</Text>
      <View>
        <View>
          <View style={styles.profileImgView}>
            <Image
              source={
                imgSelected
                  ? {
                      uri: `data:${imgSelected?.mime};base64,${imgSelected?.data}`,
                    }
                  : photoURL
                  ? {uri: `data:${photoURL?.mime};base64,${photoURL?.data}`}
                  : ICON?.VeganLogo
              }
              style={styles.profileImg}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity onPress={() => onImageSelect()}>
            <Image
              source={ICON.ImgEdit}
              style={styles.imgStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {(profileData?.username || displayName) && (
          <Text style={styles.displayName}>
            {profileData?.username || displayName}
          </Text>
        )}
        <View style={styles.textfield1}>
          <InputField
            title={'User name'}
            vectorIconName={'person-outline'}
            value={values.username}
            style={[styles.placeHolder, styles.placeTypo]}
            placeholder="John Doe"
            onChangeText={txt => handleChange('username')(txt)}
            isErrorMsgRequired={touched?.username && errors?.username}
            errorText={errors?.username}
          />
        </View>
        <View style={styles.textfield1}>
          <InputField
            title={'Mobile Number'}
            vectorIconName={'phone-portrait-outline'}
            value={values.mobileNumber}
            style={[styles.placeHolder, styles.placeTypo]}
            placeholder="(565) 666-8838"
            onChangeText={txt => handleChange('mobileNumber')(txt)}
            isErrorMsgRequired={touched?.mobileNumber && errors?.mobileNumber}
            errorText={errors?.mobileNumber}
            maxLength={10}
          />
        </View>
        <View style={styles.textfield1}>
          <InputField
            title={'Address'}
            vectorIconName={'earth-outline'}
            value={values.address}
            style={[styles.placeHolder, styles.placeTypo]}
            placeholder="city ,country ,zipCode"
            onChangeText={txt => handleChange('address')(txt)}
            isErrorMsgRequired={touched?.address && errors?.address}
            errorText={errors?.address}
            maxLength={50}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          underlayColor={COLOR_SECONDARY}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#E5B480', '#CCA071', '#B28C63']}
            style={styles.linearGradientStyle}>
            <View style={styles.ButtonActivity}>
              <Text style={styles.submitTxt}>{'Submit'}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
