import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {styles} from './styles';
import {useFormik} from 'formik';
import {validationSchema} from '../../../utils/formik/signUp';
import InputField from '../../../component/inputField';
import {Button} from '../../../component/buttons';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {userRegistration} from '../../../firebase';

const SignUpScreen = () => {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const navigation = useNavigation();
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
              showPass={showPass1 ? 'Hide' : 'Show'}
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
              showPass={showPass2 ? 'Hide' : 'Show'}
              onShowPass={() => setShowPass2(prev => !prev)}
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
        textStyle={styles.buttonLabel}
        text={'Continue'}
        onPress={() => handleSubmit()}
        isLinearGradient={true}
      />
    </ScrollView>
  );
};

export default SignUpScreen;
