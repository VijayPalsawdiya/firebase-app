import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './styles';
// import {
//   sendPasswordResetEmail,
//   userRegistration,
//   validUserLogin,
// } from '../../firebase';
import {useFormik} from 'formik';
// import {validationSchema} from '../../utils/formik/signUp';
import {validationSchema} from '../../../utils/formik/signUp';
import InputField from '../../../component/inputField';
// import InputField from '../../../component/inputField';
// import {Button} from '../../../component/buttons';
import {Button} from '../../../component/buttons';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  sendPasswordResetEmail,
  userRegistration,
  validUserLogin,
} from '../../../firebase';

const SigninScreen = props => {
  const {route} = props || {};
  const {isLoginClicked} = route?.params || {};
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const navigation = useNavigation();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {handleChange, handleSubmit, resetForm, values, errors, touched} =
    useFormik({
      validationSchema: validationSchema(isLogin),
      initialValues: initialValues,
      onSubmit: userValues => {
        handleSignUpFunc(userValues?.email ?? '', userValues?.password ?? '');
      },
    });

  useEffect(() => {
    if (isLoginClicked === 'login') {
      setIsLogin(!true);
    }
    if (isLoginClicked === 'signup') {
      setIsLogin(true);
    }
  }, [isLoginClicked]);

  const navigationCallback = () => {
    navigation.replace('Home');
  };

  const handleSignUpFunc = (email, password) => {
    if (isLogin) {
      userRegistration(email, password, navigation);
    } else if (isForgetPassword && email) {
      sendPasswordResetEmail(email);
    } else {
      validUserLogin(email, password, navigation);
    }
  };

  // Handle user state changes
  function onAuthStateChanged(_user) {
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth()?.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  const handleResetData = () => {
    resetForm();
  };

  return (
    <ScrollView style={[styles.signup, styles.iconLayout]} bounces={'false'}>
      <Text style={[styles.signUp, styles.signUpTypo]}>{'Welcome back!'}</Text>
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
              secureTextEntry={!showPass1}
              showPass={'Show'}
              onShowPass={() => setShowPass1(prev => !prev)}
            />

            <Text
              onPress={() => navigation.navigate('ForgetPassword')}
              style={styles.forgetpasswordstyle}>
              Forgot password?
            </Text>
          </View>
        </View>
        <Text style={[styles.bySigningUpContainer, styles.placeTypo]}>
          <Text style={styles.bySigningUp1}>
            By signing up you agree to our{' '}
          </Text>
          <Text style={styles.termsCondition} onPress={() => {}}>
            Terms & Condition
          </Text>
          <Text style={styles.bySigningUp1}> and </Text>
          <Text style={styles.termsCondition} onPress={() => {}}>
            Privacy Policy.
          </Text>
          <Text style={styles.text2}>*</Text>
        </Text>
      </View>
      <Button
        buttonStyle={styles.button}
        textStyle={[styles.buttonLabel, styles.text1Typo]}
        text={'Continue'}
        onPress={() => handleSubmit()}
      />
      <TouchableOpacity
        style={[styles.alreadySignedUpParent, styles.headerPosition]}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        <Text style={[styles.alreadySignedUp1, styles.placeTypo]}>
          {'Don’t have an account ?'}
        </Text>
        <Text style={[styles.login, styles.placeTypo]}>{' Sign up'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SigninScreen;
