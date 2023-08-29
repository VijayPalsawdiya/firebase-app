import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import LinearGradient from 'react-native-linear-gradient';
import {ICON} from '../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR_SECONDARY} from '../../../utils/colors';
import InputField from '../../../component/inputField';
import ImageCropPicker from 'react-native-image-crop-picker';

export default function BottomSheetAddProduct(props) {
  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    setImgSelected,
    imgSelected,
  } = props || {};

  const onImageSelect = () => {
    ImageCropPicker?.openPicker({
      height: 300,
      width: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setImgSelected(image);
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.ViewStyle}>
        <Text style={styles.addData}>Add Product details</Text>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          underlayColor={COLOR_SECONDARY}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#E5B480', '#CCA071', '#B28C63']}
            style={styles.linearGradientStyle}>
            <View style={styles.ButtonActivity}>
              <Text style={styles.submitTxt}>{'Submit'}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.profileImgView}>
          <Image
            source={
              imgSelected
                ? {
                    uri: `data:${imgSelected?.mime};base64,${imgSelected?.data}`,
                  }
                : ICON?.VeganLogo
            }
            style={styles.profileImg}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.flexD}>
          <TouchableOpacity
            style={styles.imgStyle}
            onPress={() => onImageSelect()}>
            <Text style={{}}>Add Product Photo </Text>
            <Icon name="edit" size={18} color="#900" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imgStyle}
            onPress={() => setImgSelected('')}>
            <Text style={{}}>Delete Photo</Text>
            <Icon name="trash-o" size={18} color="#900" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputBox}>
        <InputField
          title={'Product Type (foods,drinks ,snacks and sauce)'}
          inputContainerStyle={styles.inputStyle}
          placeholder={'Product Type'}
          value={values.productsType}
          onChangeText={txt => handleChange('productsType')(txt)}
          isErrorMsgRequired={touched?.productsType && errors?.productsType}
          errorText={errors?.productsType}
        />
      </View>
      <View style={styles.inputBox}>
        <InputField
          title={'Product Name (Noodles,chips etc)'}
          inputContainerStyle={styles.inputStyle}
          placeholder={'Product Name'}
          value={values.productsName}
          onChangeText={txt => handleChange('productsName')(txt)}
          isErrorMsgRequired={touched?.productsName && errors?.productsName}
          errorText={errors?.productsName}
        />
      </View>
      <View style={styles.inputBox}>
        <InputField
          title={'Product Price (1$)'}
          inputContainerStyle={styles.inputStyle}
          placeholder={'Product Price'}
          value={values.productsPrice}
          onChangeText={txt => handleChange('productsPrice')(txt)}
          isErrorMsgRequired={touched?.productsPrice && errors?.productsPrice}
          errorText={errors?.productsPrice}
        />
      </View>
    </View>
  );
}
