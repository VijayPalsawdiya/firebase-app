import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {styles} from './styles';
import {useFormik} from 'formik';
import {validationSchema} from '../../../utils/formik/signUp';
import InputField from '../../../component/inputField';
import {Button} from '../../../component/buttons';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {userRegistration} from '../../../firebase';
import {useDispatch} from 'react-redux';
import {userInfoData} from '../../../redux/reducers/userInfo';
import Icon from 'react-native-vector-icons/Ionicons';

const SignUpScreen = () => {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {handleChange, handleSubmit, values, errors, touched} = useFormik({
    validationSchema: validationSchema(true),
    initialValues: initialValues,
    onSubmit: userValues => {
      handleSignUpFunc(userValues?.email ?? '', userValues?.password ?? '');
    },
  });

  const handleSignUpFunc = (email, password) => {
    if (email && password) {
      userRegistration(email, password, navigation);
    }
  };

  // Handle user state changes
  function onAuthStateChanged(_user) {
    dispatch(userInfoData(_user));
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth()?.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <ScrollView style={styles.signup} bounces={'false'}>
      <View style={styles.frameParent}>
        <View>
          {/* <View style={styles.textfield1}>
            <InputField
              title={'User Name'}
              value={values.username}
              style={[styles.placeHolder, styles.placeTypo]}
              placeholder="Your Name"
              onChangeText={txt => handleChange('username')(txt)}
              isErrorMsgRequired={touched?.username && errors?.username}
              errorText={errors?.username}
            />
          </View> */}
          <View style={styles.textfield1}>
            <InputField
              title={'Email'}
              vectorIconName={'mail-outline'}
              value={values.email}
              style={[styles.placeHolder, styles.placeTypo]}
              placeholder="Your Email"
              onChangeText={txt => handleChange('email')(txt)}
              isErrorMsgRequired={touched?.email && errors?.email}
              errorText={errors?.email}
            />
          </View>
          <View style={styles.textfield1}>
            <InputField
              title={'Password'}
              value={values.password}
              style={[styles.placeHolder, styles.placeTypo]}
              placeholder="Your Password"
              onChangeText={txt => handleChange('password')(txt)}
              isErrorMsgRequired={touched?.password && errors?.password}
              errorText={errors?.password}
              secureTextEntry={!showPass1}
              showPass={
                showPass1 ? (
                  <Icon name={'eye-off-outline'} size={16} color="#900" />
                ) : (
                  <Icon name={'eye-outline'} size={16} color="#900" />
                )
              }
              onShowPass={() => setShowPass1(prev => !prev)}
            />
          </View>

          <View style={styles.textfield1}>
            <InputField
              title={'Confirm Password'}
              value={values.confirmPassword}
              style={[styles.placeHolder, styles.placeTypo]}
              placeholder="Confirm Password"
              onChangeText={txt => handleChange('confirmPassword')(txt)}
              isErrorMsgRequired={
                touched.confirmPassword && errors.confirmPassword
              }
              errorText={errors?.confirmPassword}
              secureTextEntry={!showPass2}
              showPass={
                showPass2 ? (
                  <Icon name={'eye-off-outline'} size={16} color="#900" />
                ) : (
                  <Icon name={'eye-outline'} size={16} color="#900" />
                )
              }
              onShowPass={() => setShowPass2(prev => !prev)}
            />
          </View>
        </View>
      </View>
      <Button
        linearGradientStyle={styles.linearGradientStyle}
        textStyle={styles.buttonLabel}
        text={'Continue'}
        onPress={() => handleSubmit()}
        isLinearGradient={true}
      />
    </ScrollView>
  );
};

export default SignUpScreen;
