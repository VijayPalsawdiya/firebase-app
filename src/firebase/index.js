import auth from '@react-native-firebase/auth';
import {showToast} from '../utils/helper';

let msg;
//User Registration
const userRegistration = (email, password, navigation) => {
  auth()
    ?.createUserWithEmailAndPassword(email, password)
    ?.then(() => {
      msg = 'User account created & signed in!';
      showToast('success', 'Successfull Saved', msg);
      navigation.replace('Home');
    })
    ?.catch(error => {
      if (error?.code === 'auth/email-already-in-use') {
        msg = 'That email address is already in use!';
        showToast('error', 'Account created', msg);
      }

      if (error?.code === 'auth/invalid-email') {
        msg = 'That email address is invalid!';
        showToast('error', 'Invalid', msg);
      }
    });
};

//if User is Valid
const validUserLogin = (email, password, navigation) => {
  auth()
    ?.signInWithEmailAndPassword(email, password)
    ?.then(user => {
      // If server response message same as Data Matched
      showToast('success', 'Login Successfull', '');
      navigation.replace('Home');
    })
    ?.catch(error => {
      if (error?.code === 'auth/invalid-email') {
        msg = 'Invalid Email';
        showToast('error', 'error', msg);
      } else if (error?.code === 'auth/user-not-found') {
        msg = 'No User Found';
        showToast('error', 'error', msg);
      } else {
        msg = 'Please check your email id or password';
        showToast('error', 'error', msg);
      }
    });
};

const sendPasswordResetEmail = async email => {
  try {
    await auth().sendPasswordResetEmail(email);

    showToast(
      'success',
      'Mail sent to your Email',
      'Password reset email sent successfully.',
    );
  } catch (error) {
    showToast('error', 'Error sending password reset email:', 'No User Found');
  }
};

//Sign Out
const SignOutFunc = () => {
  auth()
    ?.signOut()
    ?.then(() => showToast('success', 'User signed out!', ''));
};

export {userRegistration, validUserLogin, SignOutFunc, sendPasswordResetEmail};