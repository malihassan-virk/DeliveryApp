import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Header } from '../../Components/Header';

import { DetailsItem } from './DetailsItem';

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const item = props.route.params?.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        name={"Home Details"}
        nameIcon={false}
        backIcon={true}
        backonPress={() => { navigation.goBack() }}
        manageOnPress={() => { }}
        manageIcon={false}
      />


      <DetailsItem
        item={item}
        name={item?.name}
        airline={item?.airline}
      />

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

export default HomeScreen;
