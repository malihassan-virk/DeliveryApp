import React from 'react';
import {
    Image, Text,
    Pressable, View, StyleSheet, Platform,
} from 'react-native';
import COLORS from '../Constants/COLORS';
import FONTS from '../Constants/FONTS';

export const Header = ({
    name,
    nameIcon,
    backIcon,
    backonPress,
    manageOnPress,
    manageIcon,
    manageText
}) => {

    return (

        <View style={[styles.container, styles.cardShadow]}>
            <Pressable onPress={backonPress} style={styles.row}>
                <Image
                    source={
                        nameIcon ?
                            require('../Assets/Images/person.png')
                            :
                            backIcon ?
                                require('../Assets/Images/left.png')
                                :
                                ""
                    }
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text numberOfLines={1}
                    style={[styles.textPost]}>{name}</Text>
            </Pressable>

            {manageIcon ?
            <Pressable onPress={manageOnPress} style={styles.manage}>
                <Text numberOfLines={1}
                    style={[styles.content, {}]}>{manageText}</Text>
                    </Pressable>
                :
                <>
                </>
            }


        </View>

    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    container: {
        height: 50,
       // marginBottom: 10,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        flexDirection: "row"
    },

    textPost: {
        fontWeight: "500",
        fontSize: FONTS.Body,
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
        borderBottomWidth:0.5,
        borderBottomColor:COLORS.desertStorm,
        backgroundColor: "white",
        // shadowColor: "black",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 10,
        // elevation: Platform.OS === "android" ? 4 : 1,
    },
    manage:{
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: Platform.OS === "android" ? 4 : 1,
        padding:10
    }
});
