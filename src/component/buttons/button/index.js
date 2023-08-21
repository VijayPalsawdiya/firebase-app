/**
 * Button Components.
 */

import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {COLOR_SECONDARY} from '../../../utils/colors';
import {styles} from './styles';

/**
 *
 * @param {*} props
 * @returns
 */
const Button = props => {
  const {
    buttonStyle,
    onPress,
    text,
    textStyle,
    activeOpacity = 0.5,
    buttonDisabled = false,
    height = 46,
  } = props || {};

  const combinedStyle = {
    ...styles.touchableHighlight,
    height: height,
  };

  return (
    <TouchableOpacity
      disabled={buttonDisabled}
      onPress={onPress}
      underlayColor={COLOR_SECONDARY}
      style={[combinedStyle, buttonStyle]}
      activeOpacity={activeOpacity}>
      <View style={styles.ButtonActivity}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
