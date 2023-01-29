import React from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import COLORS from '../Constants/COLORS';
const height = Dimensions.get('window').height/2;
const ActivityLoader = (props) => {
    if(props?.state){
    return (
        <View style={[
            {
                position: "absolute",
                 top: height - 50,
                height: 50,
                width: 50,
                borderRadius: 50,
                alignSelf: "center",
                alignContent: "center",
                justifyContent:"center",
                alignItems:"center",

        backgroundColor: "white",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        shadowColor: "#000",
            },
            props.styles
        ]}>
            <ActivityIndicator size="small" color={COLORS.black} />
        </View>
    );
    }
    else{
        return(
            null
        )
    }
};

export default ActivityLoader;
