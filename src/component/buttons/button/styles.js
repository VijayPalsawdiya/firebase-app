/**
 * Button Components Styles.
 */
import {StyleSheet} from 'react-native';
import {COLOR_WHITE} from '../../../utils/colors';

/**
 *
 */
export const styles = StyleSheet.create({
  touchableHighlight: buttonColor => ({
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: buttonColor,
  }),
  text: {
    color: COLOR_WHITE,
    letterSpacing: 0.8,
    textAlign: 'center',
    flex: 1,
    fontWeight: '600',
    fontSize: 16,
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
  linearGradient: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 10,
  },
  linearGradientStyle: {
    marginTop: 2,
  },
});
