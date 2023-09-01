import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/header';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {Button} from '../../component/buttons';

export default function CartScreen() {
  const navigation = useNavigation();
  const [savedData, setSavedData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const {addtoCart = []} = useSelector(state => state.addtoCartReducer);

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
            orderSize: 1,
          });
        });
        setSavedData(products);
      });
  }, []);

  useEffect(() => {
    const cartItem = savedData?.filter(i => addtoCart?.includes(i.key));
    setSelectedData(cartItem);
  }, [addtoCart, savedData]);

  const handleIncrement = _key => {
    if (_key) {
      setSelectedData(
        selectedData?.map(item => {
          if (item.key === _key) {
            const newincrement = item.orderSize + 1;
            return {...item, orderSize: newincrement};
          } else {
            return item;
          }
        }),
      );
    }
  };

  const handleDecremet = _key => {
    if (_key) {
      setSelectedData(
        selectedData?.map(item => {
          if (item.key === _key) {
            const newincrement = item.orderSize - 1;
            return {
              ...item,
              orderSize: newincrement,
              productsPrice: item.productsPrice * newincrement,
            };
          } else {
            return item;
          }
        }),
      );
    }
  };

  const renderItm = item => {
    const {imgSelected: img, userValues, key, orderSize} = item || {};
    return (
      <View style={styles.cardStyle}>
        <Image
          source={{
            uri: `data:${img?.mime};base64,${img?.data}`,
          }}
          style={styles.imgStyle}
          resizeMode="cover"
        />
        <View style={styles.txtView}>
          <View>
            <Text style={styles.txtStyle}>{userValues?.productsType}</Text>
            <Text style={styles.txtStyle}>{userValues?.productsName}</Text>
            <View style={{}}>
              <Text style={styles.txtStyle}>
                <Icon name="rupee" size={16} color="#000" />
                {userValues?.productsPrice * orderSize}
              </Text>
            </View>
          </View>
          <View style={styles.inDestyle}>
            <TouchableOpacity onPress={() => handleIncrement(key)}>
              <Icon name="plus" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.nuberStyle}>{orderSize}</Text>
            <TouchableOpacity
              disabled={orderSize === 1}
              onPress={() => handleDecremet(key)}>
              <Icon name="minus" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        isbackIconShow
        title={'Cart'}
        backClicked={() => navigation.navigate('Home')}
      />
      <View style={styles.container}>
        <View>
          {selectedData?.length > 0 ? (
            <>
              <FlatList
                data={selectedData ?? []}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => renderItm(item)}
                contentContainerStyle={styles.paddinB}
              />
            </>
          ) : (
            <Text style={styles.noDataFound}>No Data Found</Text>
          )}
        </View>
      </View>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12,
          backgroundColor: 'white',
          height: 100,
          marginBottom: -40,
        }}>
        <Button
          linearGradientStyle={styles.linearGradientStyle}
          textStyle={styles.buttonLabel}
          text={'Add to cart'}
          // onPress={() => handleCart(docId)}
          isLinearGradient={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  paddinB: {paddingBottom: 130},
  noDataFound: {
    color: 'red',
    height: 700,
    paddingTop: '60%',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  cardStyle: {
    flexDirection: 'row',
    height: 120,
    width: '98%',
    backgroundColor: '#CCA071',
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imgStyle: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  txtStyle: {
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 16,
    paddingVertical: 6,
  },
  txtView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inDestyle: {
    // flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nuberStyle: {
    fontSize: 22,
    fontWeight: '500',
    paddingHorizontal: 6,
  },
  linearGradientStyle: {
    marginTop: 10,
    marginHorizontal: 50,
    borderRadius: 30,
  },
  buttonLabel: {
    flex: 1,
  },
});
