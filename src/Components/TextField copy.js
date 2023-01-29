
import React, { useEffect, useState, useRef } from "react";
import {
	Platform,
	View,
	StyleSheet,
	TextInput,
	Text,
	Animated,
	Pressable,
} from "react-native";
import COLORS from "../Constants/COLORS";
import FONTS from "../Constants/FONTS";
import { Hoshi } from 'react-native-textinput-effects';
const TextField = (props) => {
	const [value, setValue] = useState(props.value);
	const moveText = useRef(new Animated.Value(0)).current;
	const NameInput = useRef(null);

	useEffect(() => {
		if (value !== "") {
			moveTextTop();
		} else if (value === "") {
			moveTextBottom();
		}
	}, [value, props.value])

	useEffect(() => {
		setValue(props.value)
	}, [props.value])

	const onChangeText = (text) => {
		setValue(text);
		props.onChangeText(text)
	};

	const onFocusHandler = () => {
		if (value !== "") {
			moveTextTop();
		}
	};

	const onBlurHandler = () => {
		if (value === "") {
			moveTextBottom();
		}
	};

	const moveTextTop = () => {
		Animated.parallel([
			Animated.timing(moveText, {
				toValue: 1,
				duration: 200,
				useNativeDriver: false,
			})
		]).start()
	};

	const moveTextBottom = () => {
		Animated.parallel([
			Animated.timing(moveText, {
				toValue: 0,
				duration: 200,
				useNativeDriver: false,
			})
		]).start()
	};

	const yVal = moveText.interpolate({
		inputRange: [0, 1],
		outputRange: [4, Platform.OS === "android" ?  -4.4 : -4],
	});

	const animStyle = {
		transform: [
			{
				translateY: yVal,
			},
		],
	};

	const {
		disable,
		input,
		multiline,
		isDarkTheme,
		error,
		label,
		errorMsg,
		isRowButton,
		rowOnPress,
		keyboardType
	} = props;
	const MyColorTheme = COLORS.black
	return (
        <Hoshi
    label={'Town'}
    // this is used as active border color
    borderColor={'#b76c94'}
    // active border height
    borderHeight={0.5}
    inputPadding={10}
    inputStyle={{
        paddingHorizontal:10,
        fontSize:FONTS.label,
        paddingVertical:10

    }}
    style={{
        backgroundColor:"red",
        marginBottom:5
    }}
    // this is used to set backgroundColor of label mask.
    // please pass the backgroundColor of your TextInput container.
   // backgroundColor={'#F9F7F6'}
  />
		// <>
		// 	<View style={[styles.container, input]}>
		// 		<Animated.View style={[styles.animatedStyle, animStyle]}>
		// 			<Text onPress={() => { NameInput?.current?.focus() }}
		// 				style={[styles.label,
		// 				{
		// 					color: value === "" ? "#ccc" : MyColorTheme,
		// 					marginStart: value ? -4 : 0,
							
		// 				}]}>
		// 				{label}</Text>
		// 		</Animated.View>
		// 		{isRowButton ?
		// 			<Pressable style={[
		// 				styles.input,
		// 				{
		// 					justifyContent: "center"
		// 				},
		// 			]}
		// 				onPress={() => { rowOnPress() }}
		// 			>
		// 				<Text style={[
		// 					{
		// 						color: disable ? COLORS.darkGray : COLORS.black,
		// 						fontSize:FONTS.Label,
		// 					},
		// 				]}>{value}</Text>
		// 			</Pressable>
		// 			:
		// 			<TextInput
		// 				autoCapitalize={"none"}
		// 				keyboardType={keyboardType ? keyboardType : "default"}
		// 				ref={NameInput}
		// 				style={[styles.input
		// 				//	, input, { paddingTop: multiline ? 10 : 0 }
		// 				]}
		// 				value={value}
		// 				//multiline={multiline}
		// 				onChangeText={(text) => onChangeText(text)}
		// 				editable={!disable}
		// 				onFocus={onFocusHandler}
		// 				onBlur={onBlurHandler}
		// 				blurOnSubmit
		// 			/>
		// 		}
		// 	</View>
		// 	{error &&
		// 		<View style={[{ alignItems: "flex-end" }]}>
		// 			<Text style={[{ fontSize: 11 }, styles.errorText]}>{errorMsg}</Text>
		// 		</View>
		// 	}
		// </>
	);
};
export default TextField;

const styles = StyleSheet.create({
	container: {
		marginTop: 4.5,
		backgroundColor: "#fff",
		paddingHorizontal: 0,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: COLORS.desertStorm,
		width: "100%",
		alignSelf: "center",
	},
	animatedStyle: {
		top:Platform.OS === "android" ? 0 : 0.3,
		left: 2,
		position: 'absolute',
		borderRadius: 90,
		zIndex: 10000,
	},
	label: {
		marginVertical: 8,
		position: "absolute",
		left: 5,
		fontSize:FONTS.Label,
		paddingHorizontal: 0,
		zIndex: 10,
	},
	input: {
		fontSize: FONTS.Label,
		paddingHorizontal: 6,
		height: 45,
		color:"black",
		// borderWidth: 1.5,
		// borderRadius: 5,
	},
	errorText: {
		paddingTop: 3,
		paddingStart: 5,
		color: "#be1218",
	},
});