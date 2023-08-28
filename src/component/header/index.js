import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header(props) {
  const {
    isbackIconShow = false,
    backClicked,
    isNextIconShow = false,
    nextClicked,
    title = 'Header',
  } = props || {};
  return (
    <View style={styles.container}>
      {isbackIconShow && (
        <TouchableOpacity onPress={backClicked} style={styles.iconStyle2}>
          <Icon name="chevron-back-outline" size={25} color="#900" />
        </TouchableOpacity>
      )}
      <View>{title && <Text style={styles.titleStyle}>{title}</Text>}</View>
      {isNextIconShow && (
        <TouchableOpacity onPress={nextClicked} style={styles.iconStyle2}>
          <Text style={styles.titleStyle}>Profile</Text>
          <Icon name="person-outline" size={16} color="#900" />
          <Icon name="chevron-forward-outline" size={25} color="#900" />
        </TouchableOpacity>
      )}
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
    alignItems: 'center',
    paddingRight: 8,
  },
  iconStyle2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
