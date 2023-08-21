/**
 * Button Components Styles.
 */
import {StyleSheet} from 'react-native';
import {COLOR_PRIMARY, COLOR_BLACK} from '../../../utils/colors';

/**
 *
 */
export const styles = StyleSheet.create({
  touchableHighlight: {
    paddingVertical: 11,
    paddingHorizontal: 15,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: COLOR_PRIMARY,
    borderWidth: 2,
    flexDirection: 'row',
  },
  text: {
    color: COLOR_BLACK,
    alignSelf: 'center',
    letterSpacing: 0.25,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  btnImage: {
    marginRight: 10,
    width: 15,
    height: 15,
  },
  ButtonActivity: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
