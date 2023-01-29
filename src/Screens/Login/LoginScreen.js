import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Header } from '../../Components/Header';
import TextField from '../../Components/TextField';
import COLORS from '../../Constants/COLORS';
import FONTS from '../../Constants/FONTS';
import { loginService } from '../../Redux/Actions/auth/authActions';


const LoginScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onTextChange =(text,type)=>{
     if(type == "email"){
      setemail(text)
    }
    else if(type == "password"){
      setpassword(text)
    }
  }


  const loginAction = () => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    
    dispatch(loginService(
      data,
     success => {
       console.log("success success==>", success)
       navigation.replace('HomeScreen')
       alert("Successfully login")
   },
   error => {
     console.log("error in user updating==>", error)
   }
     
     ));

  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        name={"Login"}
        nameIcon={false}
        backIcon={true}
        backonPress={() => {  }}
        manageOnPress={() => {loginAction() }}
        manageIcon={true}
        manageText={"Login"}
      />
<View style={{marginHorizontal:10}}>

                                <TextField
                                    label="Email"
                                    onChangeText={(txt) => {onTextChange(txt, "email") }}
                                    value={email}
                                    error={false}
                                    errorMsg={"Please enter your email"}
                                />
                                <TextField
                                    label="Password"
                                    onChangeText={(txt) => {onTextChange(txt, "password") }}
                                    value={password}
                                    error={false}
                                    errorMsg={"Please enter your password"}
                                />
                                </View>
                                <Text
                                onPress={()=>{navigation.navigate("SignUpScreen")}}
                    style={[styles.content]}>
                      {"Create a new account"}
                      </Text>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white"
  },
  content:{
    marginTop:20,
    fontWeight: "500",
    fontSize: FONTS.Label,
    color: COLORS.black,
    textAlign:"center"
  }
});

export default LoginScreen;
