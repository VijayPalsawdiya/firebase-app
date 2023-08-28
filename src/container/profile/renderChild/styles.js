import {COLOR_BLACK, COLOR_WHITE} from '../../../utils/colors';

const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  textfield1: {
    height: 100,
    width: '100%',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  placeHolder: {
    color: '#747980',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  placeTypo: {
    fontWeight: '500',
    textAlign: 'center',
  },
  updateStyle: {
    color: '#B28C63',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 18,
    fontWeight: '600',
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 5,
    backgroundColor: '#E5B480',
  },
  profileImgView: {
    height: 110,
    width: 110,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 16,
    backgroundColor: '#E5B480',
  },
  buttonLabel: {
    flex: 1,
  },
  linearGradientStyle: {
    marginTop: 10,
    marginHorizontal: 50,
    borderRadius: 30,
    paddingHorizontal: 2,
    paddingVertical: 2,
    height: 50,
    justifyContent: 'center',
  },
  ButtonActivity: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  submitTxt: {
    color: COLOR_WHITE,
    letterSpacing: 0.8,
    textAlign: 'center',
    flex: 1,
    fontWeight: '600',
    fontSize: 16,
  },
  imgStyle: {
    height: 22,
    width: 22,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 18,
    right: '38%',
    borderRadius: 4,
  },
  displayName: {
    color: COLOR_BLACK,
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
  },
});
