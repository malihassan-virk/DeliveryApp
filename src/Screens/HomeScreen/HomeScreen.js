import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActivityLoader from '../../Components/ActivityLoader';
import { Header } from '../../Components/Header';
import { getAllFlightService } from '../../Redux/Actions/home/homeAction';

import { ListItem } from './ListItem';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [newsFeed, setNewsFeed] = useState([])
  const [isNextPage, setIsNextPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [extraDataAvailble, setExtraDataAvailble] = useState(false)

  const authData = useSelector(
    state => state.getauthList.data
  );

  useEffect(() => {
    setLoader(true);
    fetchData(1)
  }, []);

  const fetchData = (page) => {
    dispatch(getAllFlightService(
      {
        "page": page,
      },
      success => {
        let feedData = success?.data?.data ? success?.data?.data : []
        let posts = isNextPage ? [...newsFeed, ...feedData] : feedData;
        setNewsFeed(posts)
        setIsNextPage(success?.data?.next ? true : false)
        setPageNumber(success?.data?.next ? pageNumber + 1 : 1)
        setRefreshing(false);
        setLoader(false)
        setExtraDataAvailble(!extraDataAvailble)
      },
      error => {
        setRefreshing(false);
        setLoader(false)
      }
    ));
  }


  const onEndToLoadMoreData = () => {
    if (isNextPage) {
      fetchData(pageNumber)
    }
  }

  const onPullToRefresh = () => {
    setRefreshing(true);
    fetchData(1)
    setPageNumber(1)
    setIsNextPage(false)

  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        name={authData?.user?.name}
        nameIcon={true}
        backIcon={false}
        backonPress={() => {  }}
        manageOnPress={() => { navigation.navigate('ManageScreen') }}
        manageIcon={true}
        manageText={"Manage"}
      />
      <FlatList
        data={newsFeed}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <ListItem
              item={item}
              name={item?.name}
              airline={item?.airline}
              onPress={() => { navigation.navigate('HomeDetails', { params: item }) }}
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
          onEndToLoadMoreData()
        }}
      />
      <ActivityLoader
        style={{}}
        state={loader}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
});

export default HomeScreen;
