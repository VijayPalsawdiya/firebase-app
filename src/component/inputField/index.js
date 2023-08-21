import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import {styles} from './styles';
import {COLOR_GRAY} from '../../utils/colors';

const InputField = props => {
  const {
    placeholder = '',
    inputContainerStyle = '',
    onChangeText = {},
    keyboardType = 'default',
    value = null,
    maxLength = 28,
    title,
    length,
    titleStyle,
    error,
    isErrorMsgRequired,
    errorText,
    validationErrorStyle,
    innerRef,
    secureTextEntry = false,
    showPass,
    onShowPass,
  } = props || {};
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View style={inputContainerStyle}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={styles.inputContainer(isSelected, error)}>
        <TextInput
          ref={innerRef}
          placeholder={placeholder}
          placeholderTextColor={COLOR_GRAY}
          style={length ? styles.input : styles.placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          value={value}
          maxLength={maxLength}
          onFocus={() => setIsSelected(true)}
          onBlur={() => setIsSelected(false)}
          secureTextEntry={secureTextEntry}
        />
        {showPass && (
          <Text onPress={onShowPass} style={styles.codeLength}>
            {showPass}
          </Text>
        )}
      </View>
      {isErrorMsgRequired ? (
        <Text style={[styles.error, validationErrorStyle]}>{errorText}</Text>
      ) : null}
    </View>
  );
};
export default InputField;
