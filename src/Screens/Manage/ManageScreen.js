import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Pressable,
  Platform,
  Text
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../Components/Header';
import { DriverItem } from './DriverItem';
import { getAllDriversService } from '../../Redux/Actions/driver/driverAction';
import FONTS from '../../Constants/FONTS';
import COLORS from '../../Constants/COLORS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ManageScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [newsFeed, setNewsFeed] = useState([])
  const [isNextPage, setIsNextPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [extraDataAvailble, setExtraDataAvailble] = useState(false)

  const authData = useSelector(
    state => state.getauthList.data
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchData()
    }, [])
  );

  useEffect(() => {
    setRefreshing(true);
    fetchData()
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



  const onPullToRefresh = () => {
    setRefreshing(true);
    fetchData()

  }


  const logoutAction = () => {
    AsyncStorage.clear()
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
      });
    }

  return (
    <SafeAreaView style={styles.container}>
      <Header
           name={"Your Listing"}
           nameIcon={false}
           backIcon={true}
           backonPress={() => { navigation.goBack() }}
           manageOnPress={() => {logoutAction() }}
           manageIcon={true}
           manageText={"Log Out"}
      />
      <FlatList
        data={newsFeed}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <DriverItem
              item={item}
              name={item?.name}
              onPress={() => { navigation.navigate('DriverDetailsScreen', { params: item }) }}
              callBackAfterDelete={()=>{onPullToRefresh()}}
              editDriver={()=>{
                navigation.navigate('DriverFormScreen', { params: item })
              }}
            />
          )
        }}
        keyExtractor={(item, index) => index}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              onPullToRefresh()
            }}
            tintColor="green"
            progressBackgroundColor="#fff"
            colors={['green']}
          />
        }
        onEndReached={() => {
        }}
      />

<Pressable style={styles.floatingButton}
                            onPress={() => {
                              navigation.navigate('DriverFormScreen',{
                                params:null
                              })
                              }} >
                             <Text
                    style={[styles.content]}>
                      {"Create a driver"}
                      </Text>
                        </Pressable>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
  content:{
    fontWeight: "500",
    fontSize: FONTS.Body,
    color: COLORS.white,
    textAlign:"center"
  },
  floatingButton: {
    width:150,
    height: 40,
    backgroundColor:COLORS.black,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: Platform.OS == "ios" ? 30 : 30,
    right: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: Platform.OS == "ios" ? 0.3 : 10 },
    shadowOpacity: Platform.OS == "ios" ? 0.2 : 1,
    shadowRadius: 3,
    elevation: Platform.OS == "ios" ? 0 : 10,
},
});

export default ManageScreen;

