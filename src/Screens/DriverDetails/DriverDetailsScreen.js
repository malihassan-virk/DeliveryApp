import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../Components/Header';
import { DriverItem } from './DriverItem';
import { getAllDriversService } from '../../Redux/Actions/driver/driverAction';
import FONTS from '../../Constants/FONTS';
import COLORS from '../../Constants/COLORS';

const ManageScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const item = props.route.params?.params;
  const authData = useSelector(
    state => state.getauthList.data
  );

  useEffect(() => {
  }, []);

  const fetchData = () => {
    dispatch(getAllDriversService(
      {
        page:1
      },
      success => {
        console.log("success",success)
        let feedData = success?.data ? success?.data : []
        setNewsFeed(feedData)
        setRefreshing(false);

      },
      error => {
        setRefreshing(false);
      }
    ));
  }



  return (
    <SafeAreaView style={styles.container}>
      <Header
           name={"Driver Details"}
           nameIcon={false}
           backIcon={true}
           backonPress={() => { navigation.goBack() }}
           manageOnPress={() => { }}
           manageIcon={false}
           manageText={""}
      />
  
            <DriverItem
              item={item}
              name={item?.name}
              airline={item?.airline}
              onPress={() => { }}
              callBackAfterDelete={()=>{navigation.goBack()}}
              editDriver={()=>{
                navigation.navigate('DriverFormScreen', { params: item })
              }}
            />
        

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white"
  },
  content:{
    fontWeight: "500",
    fontSize: FONTS.Body,
    color: COLORS.white,
    textAlign:"center"
  },
 
});

export default ManageScreen;

