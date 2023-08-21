import {Image, SafeAreaView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Button} from '../../component/buttons';
import {styles} from './styles';
import {ICON} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {COLOR_PURELIGHT_GREEN} from '../../utils/colors';

export default function OnBoarding() {
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const navigation = useNavigation();

  const handleNavigation = useCallback(
    _itm => {
      navigation?.navigate('Signup', {
        isLoginClicked: _itm,
      });
    },
    [navigation],
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoView}>
        <Image
          source={ICON.VeganLogo}
          style={styles.logoStyle}
          tintColor={COLOR_PURELIGHT_GREEN}
        />
      </View>
      <View style={styles.bttnView}>
        <Button
          buttonStyle={styles.button(isActive1)}
          textStyle={styles.buttonLabel(isActive1)}
          text={'Login'}
          onPress={() => {
            setIsActive1(!true);
            setIsActive2(true);
            handleNavigation('login');
          }}
        />
        <Button
          buttonStyle={styles.button(isActive2)}
          textStyle={styles.buttonLabel(isActive2)}
          text={'Signup'}
          onPress={() => {
            setIsActive1(true);
            setIsActive2(!true);
            handleNavigation('signup');
          }}
        />
      </View>
    </SafeAreaView>
  );
}
