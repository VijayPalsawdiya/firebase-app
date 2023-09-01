import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/header';
import InputField from '../../component/inputField';
import {handleSelected, scrollItems} from './logics';
import RBBottomSheet from '../../component/rbBottomSheet';
import {useFormik} from 'formik';
import {productsSchema} from '../../utils/formik/signUp';
import {styles} from './styles';
import BottomSheetAddProduct from './bottomSheet';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {ADMINUID, showToast} from '../../utils/helper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
  // Set an initializing state whilst Firebase connects
  const [searchText, setSearchText] = useState('');
  const [isTabSelected, setIsTabSelected] = useState([]);
  const [imgSelected, setImgSelected] = useState('');
  const [isReload, setIsReload] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

  const {userInfo} = useSelector(state => state.userInfoReducer);
  const {addtoCart = []} = useSelector(state => state.addtoCartReducer);

  const {uid = ''} = userInfo || {};

  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const foundObject = savedData.filter(
    item =>
      item?.userValues?.productsType?.toString() === selectedType?.toString(),
  );

  // Handle user state changes

  useEffect(() => {
    setIsTabSelected(scrollItems);
  }, []);

  const initialValues = {
    productsType: '',
    productsName: '',
    productsPrice: '',
  };

  const {handleChange, handleSubmit, values, errors, touched} = useFormik({
    validationSchema: productsSchema,
    initialValues: initialValues,
    onSubmit: userValues => {
      handleForm({
        userValues,
        imgSelected,
        uid,
      });
    },
  });
  useEffect(() => {
    firestore()
      .collection('Products')
      .get()
      .then(querySnapshot => {
        const products = [];
        querySnapshot.docs.map(documentSnapshot => {
          products.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setSavedData(products);
      });
  }, [isReload, uid]);

  const handleForm = useCallback(_userValues => {
    firestore()
      .collection('Products')
      .add(_userValues)
      .then(() => {
        console.log('_userValues added!');
        showToast('success', 'Details Saved', '');
        bottomSheetRef?.current?.close();
        setIsReload(Prev => !Prev);
      });
  }, []);

  const renderItm = item => {
    const {imgSelected: img, userValues, key} = item || {};
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('productDetails', {docId: key})}
        style={styles.renderView}>
        <Image
          source={{
            uri: `data:${img?.mime};base64,${img?.data}`,
          }}
          style={styles.imgView}
          resizeMode="cover"
        />
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
      </TouchableOpacity>
    );
  };

  const filterItem = useMemo(() => {
    if (searchText) {
      return savedData?.filter(item =>
        item?.userValues?.productsName
          ?.toLowerCase()
          ?.toString()
          ?.includes(searchText?.toLowerCase()),
      );
    }
  }, [searchText, savedData]);

  const handleData = () => {
    if (searchText?.length > 0) {
      return filterItem;
    } else if (selectedType !== 'all') {
      return foundObject;
    } else {
      return savedData;
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header
          title={'Home'}
          isNextIconShow
          nextClicked={() => navigation.navigate('Profile')}
        />
        {uid !== ADMINUID && (
          <TouchableOpacity
            onPress={() => navigation.navigate('cartScreen')}
            style={styles.cartStyle}>
            <View style={styles.cartViewStyle}>
              <Text style={styles.cartTxtStyle}>{addtoCart?.length}</Text>
            </View>
            <Icon name="cart-plus" size={28} color="#000" />
          </TouchableOpacity>
        )}

        <Text style={styles.text1}>Delicious food for you</Text>
        {uid === ADMINUID && (
          <TouchableOpacity
            onPress={() => bottomSheetRef?.current?.open()}
            style={styles.flexDir}>
            <Icon name="plus" size={16} color="#900" />
            <Text style={styles.fontStylprice}>Add Delicious food</Text>
          </TouchableOpacity>
        )}
        <InputField
          inputContainerStyle={styles.searchStyle}
          placeholder={'Search'}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          isSearchIcon={true}
        />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.scroll}>
        {isTabSelected?.map(itm => (
          <TouchableOpacity
            key={itm?.id}
            onPress={() => {
              handleSelected(itm?.id, setIsTabSelected);
              setSelectedType(itm?.type);
              setSearchText();
            }}
            style={styles.scrollItmStyles(itm?.isSelected)}>
            <Text style={styles.scrollItmStyle(itm?.isSelected)}>
              {itm?.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
        <FlatList
          data={handleData()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => renderItm(item)}
        />
      </View>
      <RBBottomSheet
        openDuration={300}
        height={270}
        ref={bottomSheetRef}
        draggableIconStyle={styles.draggableIconStyle}
        containerStyle={styles.containerStyle}
        child={
          <BottomSheetAddProduct
            handleSubmit={handleSubmit}
            values={values}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            imgSelected={imgSelected}
            setImgSelected={setImgSelected}
          />
        }
      />
    </SafeAreaView>
  );
}
