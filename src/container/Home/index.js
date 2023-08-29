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
import {showToast} from '../../utils/helper';

export default function Home() {
  // Set an initializing state whilst Firebase connects
  const [searchText, setSearchText] = useState('');
  const [isTabSelected, setIsTabSelected] = useState([]);
  const [imgSelected, setImgSelected] = useState('');
  const [isReload, setIsReload] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

  const {userInfo} = useSelector(state => state.userInfoReducer);
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
  }, [isReload]);

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
    const {imgSelected: img, userValues} = item || {};
    return (
      <View
        style={{
          marginHorizontal: 16,
          height: 220,
          width: 222,
          marginTop: 80,
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 20,
          justifyContent: 'flex-end',
          paddingBottom: 10,
        }}>
        <Image
          source={{
            uri: `data:${img?.mime};base64,${img?.data}`,
          }}
          style={{
            height: 164,
            width: 164,
            borderRadius: 100,
            position: 'absolute',
            top: -40,
          }}
          resizeMode="cover"
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '400'}}>
            {userValues?.productsType}
          </Text>
          <Text style={{fontSize: 22, fontWeight: '600'}}>
            {userValues?.productsName}
          </Text>
          <Text style={{fontSize: 16, fontWeight: '400'}}>
            ${userValues?.productsPrice}
          </Text>
        </View>
      </View>
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

        <Text style={styles.text1}>Delicious food for you</Text>
        <Text onPress={() => bottomSheetRef?.current?.open()} style={{}}>
          Add Delicious food
        </Text>
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
