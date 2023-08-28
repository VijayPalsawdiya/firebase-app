import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  headerStyle: {
    backgroundColor: '#E5B480',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  containerStyle: {
    height: 'auto',
    paddingBottom: 10,
  },
  draggableIconStyle: {display: 'flex'},
  myprofile: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 18,
    fontWeight: '700',
  },
  txtStyle: {
    paddingVertical: 4,
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: '300',
  },
  phoneNumber: {
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: '300',
  },
  paddingLeft: {
    paddingLeft: 8,
    flex: 1,
  },
  imgStyle: {
    height: 100,
    width: 100,
    borderRadius: 12,
  },
  flexDir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  paddingVer: {
    marginTop: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  extratxtStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
  arrowLeft: {
    height: 18,
    width: 18,
    transform: [{scaleX: -1}],
  },
  paddingTop: {
    bottom: -100,
    alignSelf: 'center',
  },
});
