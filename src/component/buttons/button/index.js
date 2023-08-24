/**
 * Button Components.
 */

import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {COLOR_SECONDARY} from '../../../utils/colors';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';

/**
 *
 * @param {*} props
 * @returns
 */
const Button = props => {
  const {
    buttonStyle,
    onPress,
    text = 'Continue',
    textStyle,
    activeOpacity = 0.5,
    buttonDisabled = false,
    height = 50,
    isLinearGradient = false,
    linearGradientStyle,
    buttonColor = '',
  } = props || {};

  const combinedStyle = {
    ...styles.touchableHighlight(buttonColor),
    height: height,
  };

  return (
    <>
      {isLinearGradient ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#E5B480', '#CCA071', '#B28C63']}
          style={[styles.linearGradient, linearGradientStyle]}>
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
        </LinearGradient>
      ) : (
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
      )}
    </>
  );
};

export default Button;
