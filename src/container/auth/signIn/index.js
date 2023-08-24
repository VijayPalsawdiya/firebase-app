import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {styles} from './styles';
import {useFormik} from 'formik';
import {validationSchema} from '../../../utils/formik/signUp';
import InputField from '../../../component/inputField';
import {Button} from '../../../component/buttons';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {validUserLogin} from '../../../firebase';
import {useDispatch} from 'react-redux';
import {userInfoData} from '../../../redux/reducers/userInfo';

const SigninScreen = () => {
  const [showPass, setShowPass] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  const initialValues = {
    email: 'vj@gmail.com',
    password: '12345678',
  };

  const {handleChange, handleSubmit, values, errors, touched} = useFormik({
    validationSchema: validationSchema(false),
    initialValues: initialValues,
    onSubmit: userValues => {
      handleSignUpFunc(userValues?.email ?? '', userValues?.password ?? '');
    },
  });

  const handleSignUpFunc = (email, password) => {
    if (email && password) {
      validUserLogin(email, password, navigation);
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
    <ScrollView style={[styles.signup, styles.iconLayout]} bounces={'false'}>
      <View style={styles.signUp} />
      <View style={[styles.frameParent, styles.signUpPosition]}>
        <View>
          <View style={styles.textfield1}>
            <InputField
              title={'Email'}
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
              secureTextEntry={!showPass}
              showPass={showPass ? 'Hide' : 'Show'}
              onShowPass={() => setShowPass(prev => !prev)}
            />

            <Text
              onPress={() =>
                navigation.navigate('ForgetPassword', {
                  currentEmail: values.email,
                })
              }
              style={styles.forgetpasswordstyle}>
              Forgot password?
            </Text>
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

export default SigninScreen;
