import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Header } from '../../Components/Header';
import TextField from '../../Components/TextField';
import { registerService } from '../../Redux/Actions/auth/authActions';


const SignUpScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const onTextChange =(text,type)=>{
    if(type == "name"){
      setname(text)
    }
    else if(type == "email"){
      setemail(text)
    }
    else if(type == "password"){
      setpassword(text)
    }
    else if(type == "cpassword"){
      setcpassword(text)
    }
  }


  const signupAction = () => {
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('password_confirmation', cpassword);
    
    dispatch(registerService(
      data,
     success => {
       console.log("success success==>", success)
       navigation.replace('HomeScreen')
       alert("Successfully account created")
   },
   error => {
     console.log("error in user updating==>", error)
   }
     
     ));

  }


  return (
    <SafeAreaView style={styles.container}>
      <Header
        name={"Create Account"}
        nameIcon={false}
        backIcon={true}
        backonPress={() => { navigation.goBack() }}
        manageOnPress={() => { signupAction()}}
        manageIcon={true}
        manageText={"Sign Up"}
      />
<View style={{marginHorizontal:10}}>
<TextField
                                    label="Name"
                                    onChangeText={(txt) => {onTextChange(txt, "name") }}
                                    value={name}
                                    error={false}
                                    errorMsg={"Please enter your first name"}
                                />
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
                                <TextField
                                    label="Confirm Password"
                                    onChangeText={(txt) => {onTextChange(txt, "cpassword") }}
                                    value={cpassword}
                                    error={false}
                                    errorMsg={"Please enter your password"}
                                />
                                </View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

export default SignUpScreen;
