import React from 'react';
import {
    Image, Text,
    Pressable, View, StyleSheet, Platform, Linking,
} from 'react-native';
import COLORS from '../../Constants/COLORS';
import FONTS from '../../Constants/FONTS';

export const DetailsItem = ({
    item,
    name,
    airline,
}) => {
    return (

        <View style={[styles.container, styles.cardShadow]}>
           

            <View style={styles.nameRow}>
                <Image
                    source={require('../../Assets/Images/man.png')}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text numberOfLines={1}
                    style={[styles.textPost]}>{name}</Text>
            </View>

            <View style={styles.flightRow}>
                <Text numberOfLines={1}
                    style={[styles.textPost,]}>{"Flights"} {airline?.length}</Text>

                <Text numberOfLines={1}
                    style={[styles.textPost,]}>{"Trips"} {item?.trips}</Text>
            </View>

            {airline?.length > 0 ?
                <>
                    {airline.map((e, i) => {
                        return (
                            <View style={{
                                alignItems: "center"
                            }}>
                                 <Image
                    source={{uri:e?.logo}}
                    style={styles.image}
                    resizeMode='contain'
                />

                                <View style={styles.tripRow}>
                                    <Image
                                        source={require('../../Assets/Images/takeoff.png')}
                                        style={styles.image}
                                        resizeMode='contain'
                                    />
                                    <Text numberOfLines={1}
                                        style={styles.content}>
                                        {e?.name}
                                    </Text>
                                </View>
                                <Text numberOfLines={1}
                                    style={styles.content}>
                                    {e?.slogan}
                                </Text>
                                <Text 
                                    style={styles.content}>
                                    {e?.head_quaters}
                                </Text>
                                <Text numberOfLines={1}
                                onPress={()=>{Linking.openURL(e?.website)}}
                                    style={[styles.content,{color:COLORS.blue}]}>
                                    {e?.website}
                                </Text>

                                <Text numberOfLines={1}
                                onPress={()=>{Linking.openURL(e?.website)}}
                                    style={[styles.content,{color:COLORS.darkGray}]}>
                                    Origin - {e?.country} | Established - {e?.established}
                                </Text>

                            </View>
                        )
                    })
                    }
                </>
                :
                null
            }

        </View>

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
