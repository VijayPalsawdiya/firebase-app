import {Dimensions} from 'react-native';
import Toast from 'react-native-toast-message';

export const showToast = (type, msg1, msg2) => {
  Toast.show({
    type: type,
    text1: msg1,
    text2: msg2,
  });
};

/**
 * return device width
 * @returns
 */
export const getDeviceWidth = () => {
  return Dimensions.get('window').width;
};

/**
 * return device height
 * @returns
 */
export const getDeviceHeight = () => {
  return Dimensions.get('window').height;
};
