import {Text, SafeAreaView, Image, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Header from '../../component/header';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from '../../component/buttons';
import {useDispatch, useSelector} from 'react-redux';
import {addtoCartData} from '../../redux/reducers/addtoCart';

export default function ProductDetails(props) {
  const {route} = props || {};
  const {docId} = route?.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [savedData, setSavedData] = useState([]);
  const {imgSelected, userValues} = savedData || {};
  const {addtoCart = []} = useSelector(state => state.addtoCartReducer);

  // addtoCart?.filter(i => CartScreen.includes(i.id));

  useEffect(() => {
    firestore()
      .collection('Products')
      .doc(`${docId}`)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists) {
          setSavedData(documentSnapshot?.data());
        }
      });
  }, [docId]);

  const handleCart = _docId => {
    if (!addtoCart?.includes(_docId)) {
      dispatch(addtoCartData(_docId));
      navigation.navigate('Home');
    }
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <Header
        title={'Product Details'}
        isbackIconShow
        backClicked={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <View style={styles.alignCenter}>
          <Image
            source={{
              uri: `data:${imgSelected?.mime};base64,${imgSelected?.data}`,
            }}
            style={styles.imgView}
            resizeMode="cover"
          />
        </View>
        <View style={styles.algn}>
          <Text style={styles.fontStylprice}>{userValues?.productsType}</Text>
          <Text style={styles.fontStyl}>{userValues?.productsName}</Text>
          <View style={styles.flexDus}>
            <Text style={styles.fontStylprice}>
              <Icon name="rupee" size={16} color="#000" />
              {userValues?.productsPrice}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.headingTxt}>Delivery info</Text>
          <Text style={styles.subHeadingTxt}>
            Delivered between monday aug and thursday 20 from 8pm to 91:32 pm
          </Text>
          <Text style={styles.headingTxt}>Return policy</Text>
          <Text style={styles.subHeadingTxt}>
            All our foods are double checked before leaving our stores so by any
            case you found a broken food please contact our hotline immediately.
          </Text>
        </View>

        <Button
          linearGradientStyle={styles.linearGradientStyle}
          textStyle={styles.buttonLabel}
          text={'Add to cart'}
          onPress={() => handleCart(docId)}
          isLinearGradient={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
