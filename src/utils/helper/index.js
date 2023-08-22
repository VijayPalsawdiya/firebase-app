import Toast from 'react-native-toast-message';

export const showToast = (type, msg1, msg2) => {
  Toast.show({
    type: type,
    text1: msg1,
    text2: msg2,
  });
};
