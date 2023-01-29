import React from 'react';
import {
    Image, Text,
    Pressable, View, StyleSheet, Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import COLORS from '../../Constants/COLORS';
import FONTS from '../../Constants/FONTS';
import { deleteDriversService } from '../../Redux/Actions/driver/driverAction';

export const DriverItem = ({
    item,
    name,
    airline,
    onPress,
    callBackAfterDelete,
    editDriver
}) => {
    const dispatch = useDispatch();

    const deleteDriver = () => {
        dispatch(deleteDriversService(
            item.id,
            success => {
                if ([201,200,204].includes(success?.status)) {
                    alert("Successfully deleted")
                    callBackAfterDelete()
                  }
      
            },
            error => {
            }
          ));
    }
    return (

        <Pressable onPress={onPress} style={[styles.container, styles.cardShadow]}>
            <View style={styles.nameRow}>
                <Image
                    source={require('../../Assets/Images/driver.png')}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text numberOfLines={1}
                    style={[styles.textPost]}>{name}</Text>
            </View>

            <View style={styles.flightRow}>
                <Text numberOfLines={1}
                    style={[styles.textPost,]}>{item?.gender}</Text>

                <Text numberOfLines={1}
                    style={[styles.textPost,]}>{item?.license_type}</Text>
            </View>


            <View style={{
                                alignItems: "center"
                            }}>
                                <View style={styles.tripRow}>
                                    <Image
                                        source={require('../../Assets/Images/expired.png')}
                                        style={styles.image}
                                        resizeMode='contain'
                                    />
                                    <Text numberOfLines={1}
                                        style={styles.content}>
                                        {item.license_expiry}
                                    </Text>
                                </View>
                            </View>


            <View style={styles.flightRow}>
                <Text numberOfLines={1}
                    style={[styles.textPost,]}>{"Age"} {item?.age}</Text>

                <Text numberOfLines={1}
                    style={[styles.textPost,]}>Country {item?.country}</Text>
            </View>


            <View style={styles.flightRow}>

            <View style={styles.tripRow}>
                                    <Image
                                        source={require('../../Assets/Images/call.png')}
                                        style={styles.image}
                                        resizeMode='contain'
                                    />
                                    <Text numberOfLines={1}
                                        style={styles.content}>
                                        {item?.phone}
                                    </Text>
                                </View>



                                <View style={styles.tripRow}>
                                <Pressable onPress={()=>{editDriver()}}>
                                    <Image
                                        source={require('../../Assets/Images/edit.png')}
                                        style={styles.image}
                                        resizeMode='contain'
                                    />
                                    </Pressable>
                                    <Pressable onPress={()=>{deleteDriver()}}>
                                     <Image
                                        source={require('../../Assets/Images/delete.png')}
                                        style={[styles.image,{marginEnd:0}]}
                                        resizeMode='contain'
                                    />
                                    </Pressable>
                                </View>
            </View>


                           
                               
                          
                        

        </Pressable>

    );
};

const styles = StyleSheet.create({

    container: {
        marginTop: 10,
        marginHorizontal: 10,
        justifyContent: "flex-start",
        padding: 10,
    },

    textPost: {
        fontWeight: "500",
        fontSize: FONTS.SubBody,
        color: COLORS.black,
        textTransform: 'capitalize'
    },

    content: {
        fontWeight: "500",
        fontSize: FONTS.Label,
        color: COLORS.black,
    },
    image: {
        height: 25,
        width: 25,
        marginEnd: 8
    },
    cardShadow: {
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: {
            width: 0.2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: Platform.OS === "android" ? 4 : 1,
    },
    flightRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8
    },
    nameRow:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    tripRow:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    }
});
