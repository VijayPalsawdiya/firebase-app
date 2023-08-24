import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_100,
  COLOR_ERROR,
  COLOR_GRAY_600,
  COLOR_GRAY_730,
  COLOR_LIGHT_GRAY_1,
  COLOR_PRIMARY,
  COLOR_RED,
} from '../../utils/colors';

const handleBorderColor = (isSelected, error) => {
  if (isSelected) {
    if (error) {
      return COLOR_RED;
    } else {
      return COLOR_PRIMARY;
    }
  } else {
    return COLOR_LIGHT_GRAY_1;
  }
};

export const styles = StyleSheet.create({
  inputContainer: (isSelected, error) => ({
    // borderWidth: 1,
    borderColor: handleBorderColor(isSelected, error),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 44,
    paddingRight: 16,
    borderBottomWidth: 1,
  }),
  input: {
    justifyContent: 'center',
    color: COLOR_BLACK_100,
    textAlign: 'left',
    marginLeft: 12,
    width: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    textAlign: 'left',
    marginLeft: 6,
    width: '100%',
    fontSize: 16,
    fontWeight: '400',
  },
  code: {
    color: COLOR_BLACK_100,
    marginLeft: 8,
  },
  codeLength: {
    color: COLOR_GRAY_730,
    marginLeft: 8,
    position: 'absolute',
    right: 8,
    fontWeight: '400',
  },
  title: {
    marginTop: 12,
    marginBottom: 0,
    color: COLOR_GRAY_730,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  error: {
    color: COLOR_ERROR,
    marginHorizontal: 5,
    marginTop: 5,
    textAlign: 'left',
  },
});
