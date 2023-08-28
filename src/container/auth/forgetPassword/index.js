import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {styles} from './styles';
import {useFormik} from 'formik';
import {validationSchemaForLogin} from '../../../utils/formik/signUp';
import InputField from '../../../component/inputField';
import {Button} from '../../../component/buttons';
import auth from '@react-native-firebase/auth';
import {sendPasswordResetEmail} from '../../../firebase';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../component/header';

const ForgetPassword = props => {
  const {route = ''} = props || {};
  const {currentEmail = ''} = route?.params || {};
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);

  const initialValues = {
    email: currentEmail ? currentEmail : '',
  };

  const {handleChange, handleSubmit, values, errors, touched} = useFormik({
    validationSchema: validationSchemaForLogin,
    initialValues: initialValues,
    onSubmit: userValues => {
      handleSignUpFunc(userValues?.email ?? '');
    },
  });

  const handleSignUpFunc = email => {
    if (email) {
      sendPasswordResetEmail(email, navigation);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <ScrollView style={[styles.signup, styles.iconLayout]} bounces={'false'}>
      <Header
        isbackIconShow
        title="Forget Password"
        backClicked={() => navigation.goBack()}
      />
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
        linearGradientStyle={styles.linearGradientStyle}
        buttonStyle={styles.button}
        textStyle={styles.buttonLabel}
        text={'Continue'}
        onPress={() => handleSubmit()}
        isLinearGradient={true}
      />
    </ScrollView>
  );
};

export default ForgetPassword;
