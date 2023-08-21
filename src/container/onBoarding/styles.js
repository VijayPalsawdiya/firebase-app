import {StyleSheet} from 'react-native';
import {COLOR_PURELIGHT_GREEN, COLOR_PURE_GREEN} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_PURE_GREEN,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bttnView: {
    flexDirection: 'row',
  },
  buttonLabel: isActive => ({
    color: isActive ? COLOR_PURELIGHT_GREEN : COLOR_PURE_GREEN,
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 16,
  }),
  button: isActive => ({
    backgroundColor: isActive ? COLOR_PURE_GREEN : COLOR_PURELIGHT_GREEN,
    width: '55%',
    marginBottom: -40,
    justifyContent: 'center',
    borderWidth: 0,
    height: 78,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  }),
  logoView: {
    paddingTop: '50%',
    justifyContent: 'flex-start',
    flex: 1,
  },
  logoStyle: {
    height: 80,
    width: 100,
  },
});
