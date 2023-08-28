import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/header';
import InputField from '../../component/inputField';
import {handleSelected, scrollItems} from './logics';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home() {
  // Set an initializing state whilst Firebase connects
  const [searchText, setSearchText] = useState('');
  const [isTabSelected, setIsTabSelected] = useState([]);
  const navigation = useNavigation();
  // Handle user state changes

  useEffect(() => {
    setIsTabSelected(scrollItems);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header
          title={'Home'}
          isNextIconShow
          nextClicked={() => navigation.navigate('Profile')}
        />
        <Text style={styles.text1}>Delicious food for you</Text>
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
            onPress={() => handleSelected(itm?.id, setIsTabSelected)}
            style={styles.scrollItmStyle(itm?.isSelected)}>
            <Text style={styles.scrollItmStyle(itm?.isSelected)}>
              {itm?.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: 16},
  headerStyle: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingLeft: 10,
  },
  text1: {
    fontSize: 34,
    fontWeight: '600',
    marginTop: 32,
    width: '60%',
  },
  searchStyle: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  scroll: {
    paddingLeft: 32,
    marginTop: 32,
    paddingHorizontal: 16,
    paddingRight: 32,
  },
  scrollItmStyle: isTabSelected => ({
    fontSize: 18,
    fontWeight: '400',
    color: isTabSelected ? '#CCA071' : '#9A9A9D',
    borderBottomColor: isTabSelected && '#CCA071',
    borderBottomWidth: isTabSelected ? 2 : 0,
    borderRadius: 4,
    paddingHorizontal: 8,
  }),
});
