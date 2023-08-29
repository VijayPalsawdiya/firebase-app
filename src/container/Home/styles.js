import {StyleSheet} from 'react-native';
import {COLOR_WHITE} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {paddingHorizontal: 16},
  headerStyle: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingLeft: 10,
  },
  inputBox: {
    height: 80,
    marginTop: 20,
  },
  text1: {
    fontSize: 34,
    fontWeight: '600',
    marginTop: 32,
    width: '60%',
  },
  searchStyle: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  scroll: {
    paddingLeft: 32,
    marginTop: 32,
    paddingHorizontal: 16,
    paddingRight: 32,
  },
  scrollItmStyle: isTabSelected => ({
    fontSize: 18,
    fontWeight: '400',
    color: isTabSelected ? '#CCA071' : '#9A9A9D',
    borderBottomColor: isTabSelected && '#CCA071',
    borderBottomWidth: isTabSelected ? 2 : 0,
    borderRadius: 4,
    paddingHorizontal: 8,
  }),
  scrollItmStyles: isTabSelected => ({
    fontSize: 18,
    fontWeight: '400',
    color: isTabSelected ? '#CCA071' : '#9A9A9D',
    paddingHorizontal: 8,
  }),
  containerStyle: {
    height: 'auto',
    paddingBottom: 20,
  },
  draggableIconStyle: {display: 'flex'},
  linearGradientStyle: {
    borderRadius: 30,
    paddingHorizontal: 2,
    paddingVertical: 2,
    height: 30,
    justifyContent: 'center',
    width: 90,
  },
  ButtonActivity: {
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
  inputStyle: {
    alignSelf: 'center',
    // marginTop: 10,
  },
  ViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addData: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    paddingTop: 10,
  },
  profileImgView: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 16,
    backgroundColor: '#E5B480',
  },
  profileImg: {
    height: 190,
    width: '97%',
    marginVertical: 5,
    marginHorizontal: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },
  imgStyle: {
    borderRadius: 4,
    flexDirection: 'row',
  },
  flexD: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
