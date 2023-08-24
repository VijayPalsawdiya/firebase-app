/*
 * RB Bottom Sheet Style
 */
import {StyleSheet} from 'react-native';
import {
  COLOR_GRAY_400,
  COLOR_WHITE,
  COLOR_WHITE_70_OPACITY,
} from '../../utils/colors';

const styles = StyleSheet.create({
  draggableIcon: {
    backgroundColor: COLOR_GRAY_400,
    height: 3,
    width: 33,
    borderRadius: 2,
    top: 10,
  },
  container: {
    backgroundColor: COLOR_WHITE,
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
  },
  backgroundcolorStyle: showTransparent => ({
    backgroundColor: showTransparent ? 'rgba(0,0,0,0)' : COLOR_WHITE_70_OPACITY,
  }),
});

export default styles;
