/**
 * Button Components Styles.
 */
import {StyleSheet} from 'react-native';

/**
 *
 */
export const styles = StyleSheet.create({
  touchableHighlight: buttonColor => ({
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: buttonColor ? '#CCA071' : '#ffffff',
  }),
  text: {
    color: '#CCA071',
    letterSpacing: 0.5,
    textAlign: 'center',
    flex: 1,
    fontWeight: '500',
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
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 10,
  },
  linearGradientStyle: {
    marginTop: 2,
  },
});
