import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useDispatch} from 'react-redux';
import { Header } from '../../Components/Header';
import { DriverItem } from './DriverItem';
import { getDriverDetailsService } from '../../Redux/Actions/driver/driverAction';
import FONTS from '../../Constants/FONTS';
import COLORS from '../../Constants/COLORS';

const ManageScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [item,setItem] =useState(props.route.params?.params)

  useFocusEffect(
    React.useCallback(() => {
      fetchData()
    }, [])
  );

 
  const fetchData = () => {
    dispatch(getDriverDetailsService(
      props.route.params?.params?.id,
      success => {
        console.log("successsuccesssuccess------>", success)
        if ([201, 200, 202].includes(success?.status)) {
          setItem(success?.data)
        }
        console.log("success success==>", success)
      },
      error => {
        console.log("error in user updating==>", error?.response)
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

