import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserData } from '../../Redux/Actions/auth/authActions';
import { useDispatch } from 'react-redux';

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            isLogged();
        }, 1000);
    }, []);


    const isLogged = async () => {
        //AsyncStorage.clear()
        let token = await AsyncStorage.getItem('userToken');
        let userData = await AsyncStorage.getItem('userData');
        token = JSON.parse(token);
        userData = JSON.parse(userData);
        if (token) {
            dispatch(updateUserData({ token: token, user: userData }));
            console.log("JSON.parse(userData)", userData)
            navigation.reset({
                index: 0, routes: [{ name: 'HomeScreen' }],
            });

        } else {
            navigation.reset({
                index: 0, routes: [{ name: 'LoginScreen' }],
            });
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={"dark-content"}
                hidden={false}
                translucent={true}
            />
            <ActivityIndicator size="small" color="black" />
        </View>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    image: {
        height: 100,
        width: 100,
    }
});

export default SplashScreen;
