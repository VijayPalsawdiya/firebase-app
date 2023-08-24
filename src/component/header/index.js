import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {ICON} from '../../assets';

export default function Header(props) {
  const {
    isbackIconShow = false,
    backClicked,
    isNextIconShow = false,
    nextClicked,
    title = 'Header',
    icon1 = ICON.Arrowleft,
    icon2 = ICON.Arrowleft,
  } = props || {};
  return (
    <View style={styles.container}>
      <View>
        {isbackIconShow && (
          <TouchableOpacity onPress={backClicked} style={styles.iconStyle}>
            <Image source={icon1} style={styles.backImg} />
          </TouchableOpacity>
        )}
      </View>
      <View>{title && <Text style={styles.titleStyle}>{title}</Text>}</View>
      <View>
        {isNextIconShow && (
          <TouchableOpacity onPress={nextClicked} style={styles.iconStyle}>
            <Image source={icon2} style={styles.nextImg} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderBottomWidth: 1,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  backImg: {
    height: 25,
    width: 25,
  },
  nextImg: {
    height: 25,
    width: 25,
    transform: [{scaleX: -1}],
  },
  iconStyle: {
    height: 25,
    width: 30,
  },
});
