import * as React from 'react';
import {
  Text,
  Image,
  View,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import {ICON} from '../../assets';
import auth from '@react-native-firebase/auth';

const SignupScreen = () => {
  const handleSignUpFunc = () => {
    auth()
      .createUserWithEmailAndPassword(
        'RAmGopalVerma.1997@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <ScrollView style={[styles.signup, styles.iconLayout]} bounces={'false'}>
      <Text style={[styles.signUp, styles.signUpTypo]}>Sign up</Text>
      <View style={[styles.frameParent, styles.signUpPosition]}>
        <View>
          <View style={styles.textfield}>
            <Text style={[styles.header1, styles.signUpTypo]}>First Name</Text>
            <View style={[styles.placeHolderWrapper, styles.buttonFlexBox]}>
              <TextInput
                style={[styles.placeHolder, styles.placeTypo]}
                placeholder="Your First Name"
              />
            </View>
          </View>
          <View style={styles.textfield1}>
            <Text style={[styles.header1, styles.signUpTypo]}>Last Name</Text>
            <View style={[styles.placeHolderWrapper, styles.buttonFlexBox]}>
              <TextInput
                style={[styles.placeHolder, styles.placeTypo]}
                placeholder="Your Last Name"
              />
            </View>
          </View>
          <View style={styles.textfield1}>
            <Text style={[styles.header1, styles.signUpTypo]}>E-mail</Text>
            <View style={[styles.placeHolderWrapper, styles.buttonFlexBox]}>
              <Image
                style={styles.iconwifi1Layout}
                resizeMode="cover"
                source={ICON.Mail}
              />
              <TextInput
                style={[styles.placeHolder2, styles.placeTypo]}
                placeholder="Your Email"
              />
            </View>
          </View>
          <View style={styles.textfield1}>
            <Text style={[styles.header1, styles.signUpTypo]}>Password</Text>
            <View style={[styles.placeHolderWrapper, styles.buttonFlexBox]}>
              <Image
                style={styles.iconwifi1Layout}
                resizeMode="cover"
                source={ICON.Lock}
              />
              <TextInput
                style={[styles.placeHolder2, styles.placeTypo]}
                placeholder="Your Password"
                secureTextEntry={true}
              />
              <Image
                style={[styles.iconeyeOff1, styles.iconwifi1Layout]}
                resizeMode="cover"
                source={true ? ICON.EyeOff : ICON.Eye}
                tintColor={'black'}
              />
            </View>
          </View>
        </View>
        <Text style={[styles.bySigningUpContainer, styles.placeTypo]}>
          <Text style={styles.bySigningUp1}>
            By signing up you agree to our{' '}
          </Text>
          <Text style={styles.termsCondition}> Terms & Conditio</Text>
          <Text style={styles.bySigningUp1}> and </Text>
          <Text style={styles.termsCondition}> Privacy Policy.</Text>
          <Text style={styles.text2}>*</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.buttonFlexBox]}
        onPress={() => handleSignUpFunc()}>
        <Text style={[styles.buttonLabel, styles.text1Typo]}>Continue</Text>
      </TouchableOpacity>
      <Pressable
        style={[styles.iconarrowLeft1, styles.signUpPosition]}
        onPress={() => {}}
      />
      <TouchableOpacity
        style={[styles.alreadySignedUpParent, styles.headerPosition]}
        onPress={() => {}}>
        <Text style={[styles.alreadySignedUp1, styles.placeTypo]}>
          Already signed up ?
        </Text>
        <Text style={[styles.login, styles.placeTypo]}>{`Login `}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupScreen;
