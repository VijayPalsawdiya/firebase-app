import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    flex: 0.4,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'flex-end',
  },
  chefLogo: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    tintColor: '#E5B480',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  tabText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  indicator: isLogin => ({
    height: 3,
    width: '40%',
    backgroundColor: '#CCA071',
    marginHorizontal: 40,
    alignSelf: isLogin ? 'flex-start' : 'flex-end',
  }),
  bottomContainer: {
    backgroundColor: '#EDEDED',
    flex: 0.6,
  },
  bttnStyle: {
    width: 150,
    height: 50,
    justifyContent: 'center',
  },
  veganText: {
    paddingBottom: 60,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});

export default styles;
