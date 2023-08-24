import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import InputField from '../../../component/inputField';
import {styles} from './styles';
import {ICON} from '../../../assets';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useFormik} from 'formik';
import {updateProfile} from '../../../firebase';
import {updateProfileSchema} from '../../../utils/formik/signUp';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR_SECONDARY} from '../../../utils/colors';
import {useSelector} from 'react-redux';
import {updatedData} from '../../../redux/reducers/userInfo';

export default function RenderBottomSheet(props) {
  const {closePopup, dispatch} = props || {};
  const [imgSelected, setImgSelected] = useState('');
  const {userInfo, profileData} = useSelector(state => state.userInfoReducer);

  const {displayName = ''} = userInfo || {};
  const initialValues = {
    username: '',
    imgurl: imgSelected,
  };

  const {handleChange, handleSubmit, values, errors, touched} = useFormik({
    validationSchema: updateProfileSchema,
    initialValues: initialValues,
    onSubmit: userValues => {
      handleSignUpFunc(userValues?.username, imgSelected);
      closePopup();
    },
  });

  const handleSignUpFunc = async (username, img) => {
    if (username || img) {
      dispatch(updatedData({username: username, img: imgSelected}));
      return await updateProfile(username, img);
    }
  };
  const onImageSelect = () => {
    ImageCropPicker?.openPicker({
      height: 80,
      width: 80,
      cropping: true,
    }).then(image => {
      setImgSelected(image?.path);
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
                      uri: imgSelected,
                    }
                  : ICON.VeganLogo
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
            value={values.username}
            style={[styles.placeHolder, styles.placeTypo]}
            placeholder="Your username"
            onChangeText={txt => handleChange('username')(txt)}
            isErrorMsgRequired={touched?.username && errors?.username}
            errorText={errors?.username}
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
