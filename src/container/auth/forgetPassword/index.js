import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useFormik} from 'formik';
import {validationSchema} from '../../../utils/formik/signUp';
import InputField from '../../../component/inputField';
import {Button} from '../../../component/buttons';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  sendPasswordResetEmail,
  userRegistration,
  validUserLogin,
} from '../../../firebase';

const ForgetPassword = props => {
  const {route} = props || {};
  const {isLoginClicked} = route?.params || {};

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
      <Text style={[styles.signUp, styles.signUpTypo]}>Forget Password</Text>
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
          navigation.navigate('Signin');
        }}>
        <Text style={[styles.alreadySignedUp1, styles.placeTypo]}>
          {'Remember your password ?'}
        </Text>
        <Text style={[styles.login, styles.placeTypo]}>{'Login'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ForgetPassword;
