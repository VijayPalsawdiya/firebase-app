import {StyleSheet} from 'react-native';
import {COLOR_GRAY} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {marginHorizontal: 16},
  imgView: {
    height: 164,
    width: 164,
    borderRadius: 100,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    height: 175,
    width: 175,
    borderRadius: 100,
    backgroundColor: '#CCA071',
    alignSelf: 'center',
  },
  algn: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
  },
  fontStylprice: {
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 4,
    paddingVertical: 4,
  },
  flexDir: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  flexDus: {
    width: '100%',
    alignItems: 'center',
  },
  fontStyl: {
    fontSize: 18,
    paddingVertical: 4,
    fontWeight: '600',
  },
  linearGradientStyle: {
    marginTop: 60,
    marginHorizontal: 50,
    borderRadius: 30,
  },
  buttonLabel: {
    flex: 1,
  },
  headingTxt: {
    fontSize: 18,
    paddingVertical: 4,
    fontWeight: '600',
  },
  subHeadingTxt: {
    fontSize: 16,
    paddingBottom: 12,
    fontWeight: '400',
    color: COLOR_GRAY,
  },
});
