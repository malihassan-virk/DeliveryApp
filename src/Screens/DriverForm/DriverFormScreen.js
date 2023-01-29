import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
  Platform,
  Text
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Header } from '../../Components/Header';
import TextField from '../../Components/TextField';
import { registerService } from '../../Redux/Actions/auth/authActions';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import FONTS from '../../Constants/FONTS';
import COLORS from '../../Constants/COLORS';
import { createDriversService, editDriversService } from '../../Redux/Actions/driver/driverAction';

const DriverFormScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setname] = useState("");
  const [licenceType, setlicenceType] = useState("Two Wheeler");
  const [age, setage] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [date, setDate] = useState(new Date());

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

useEffect(()=>{
if(props.route.params?.params){
  setname(props.route.params?.params?.name)
  setage(props.route.params?.params?.age?.toString())
  setphonenumber(props.route.params?.params?.phone)
  setlicenceType(props.route.params?.params?.license_type)
  setDate(props.route.params?.params?.created_at)
}
},[])

  const onTextChange = (text, type) => {
    if (type == "name") {
      setname(text)
    }
    else if (type == "age") {
      setage(text)
    }
    else if (type == "phonenumber") {
      setphonenumber(text)
    }
  }
  
  const updateDriver = () => {
    const data = new FormData();
    data.append('name', name);
    data.append('license_type', licenceType);
    data.append('age', age);
    data.append('license_expiry', moment(date).format('yyyy-MM-DD'));
    data.append('phone', phonenumber);


    dispatch(editDriversService(
      props.route.params?.params?.id,
      data,
      success => {
        console.log("successsuccesssuccess------>",success)
        if ([201,200,202].includes(success?.status)) {
          alert("Successfully updated")
          navigation.goBack()
        }
        console.log("success success==>", success)
      },
      error => {
        console.log("error in user updating==>", error?.response)
      }

    ));

  }

  const driverAction = () => {
    const data = new FormData();
    data.append('name', name);
    data.append('license_type', licenceType);
    data.append('age', age);
    data.append('license_expiry', moment(date).format('yyyy-MM-DD'));
    data.append('phone', phonenumber);


    dispatch(createDriversService(
      data,
      success => {
        if ([201,200,202].includes(success?.status)) {
          alert("Successfully created")
          navigation.goBack()
        }
        console.log("success success==>", success)
      },
      error => {
        console.log("error in user updating==>", error?.response)
      }

    ));

  }

  const onChangeDateAndtime = (date) => {
    setDate(date)
  }


  return (
    <SafeAreaView style={styles.container}>
      <Header
        name={props.route.params?.params ? "Edit Driver" : "Create Driver"}
        nameIcon={false}
        backIcon={true}
        backonPress={() => { navigation.goBack() }}
        manageOnPress={() => {props.route.params?.params ?  updateDriver() : driverAction() }}
        manageIcon={true}
        manageText={props.route.params?.params ? "Update" : "Create New"}
      />
      <View style={{ marginHorizontal: 10 }}>
        <TextField
          label="Name"
          onChangeText={(txt) => { onTextChange(txt, "name") }}
          value={name}
          error={false}
          errorMsg={"Please enter your first name"}
        />
        <TextField
          label="Age"
          onChangeText={(txt) => { onTextChange(txt, "age") }}
          value={age}
          error={false}
          errorMsg={"Please enter your age"}
        />
        <TextField
          label="Phone number"
          onChangeText={(txt) => { onTextChange(txt, "phonenumber") }}
          value={phonenumber}
          error={false}
          errorMsg={"Please enter your phonenumber"}
        />


      



<Text style={{ fontWeight: Platform.OS === "android" ? "700" : "500", fontSize: FONTS.Label, color: COLORS.darkGray, marginTop: 0, marginStart: 10,fontWeight:"500" }}>License Expiry</Text>
        <View style={{  height: 45, marginTop: 2, }}>
          <Pressable style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.black,
            borderWidth: 1,
            borderColor: COLORS.black,
            marginRight: 2,
          }}
            onPress={() => {
              setTimeout(() => {
                setIsDatePickerVisible(true)
              }, 500);
            }}
          >
            <Text style={{ fontSize: FONTS.Label, color:  COLORS.white }}>
            {date ? moment(date).format("yyyy-MMM-DD") : moment(new Date()).format("yyyy-mm-dd")}
              </Text>
          </Pressable>
         

        </View>

        <Text style={{ fontWeight: Platform.OS === "android" ? "700" : "500", fontSize: FONTS.Label, color: COLORS.darkGray, marginTop: 0, marginStart: 10,fontWeight:"500" }}>Licence type</Text>
        <View style={{ flexDirection: "row", height: 45, marginTop: 2, }}>
          <Pressable style={{
            flex: 1 / 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: licenceType === "Two Wheeler" ? COLORS.black : "transparent",
            borderWidth: 1,
            borderColor: licenceType === "Two Wheeler" ? COLORS.black : COLORS.desertStorm,
            marginRight: 2,
          }}
            onPress={() => {
              setlicenceType('Two Wheeler')
            }}
          >
            <Text style={{ fontSize: FONTS.Label, color: licenceType === "Two Wheeler" ? COLORS.white : COLORS.darkGray }}>Two Wheeler</Text>
          </Pressable>
          <Pressable style={{
            flex: 1 / 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: licenceType === "Four Wheeler" ? COLORS.black : "transparent",
             borderWidth: 1,
            borderColor: licenceType === "Four Wheeler" ? COLORS.black : COLORS.desertStorm,
            marginLeft: 2,
          }}
            onPress={() => {
              setlicenceType('Four Wheeler')
            }}
          >
            <Text style={{ fontSize: FONTS.Labels, color: licenceType === "Four Wheeler" ? COLORS.white : COLORS.darkGray }}>Four Wheeler</Text>
          </Pressable>



        </View>

      </View>


      <DatePicker

        modal
        mode={'date'}
        open={isDatePickerVisible}
        date={date ? new Date(date) : new Date()}
        // minimumDate={moment().toISOString()}
        is24hourSource={"locale"}
        onConfirm={(date) => {
          onChangeDateAndtime(date)
        }}
        onCancel={() => {
          setIsDatePickerVisible(false)
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
});

export default DriverFormScreen;
