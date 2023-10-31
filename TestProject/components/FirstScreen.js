import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import {
  Button,
  Appbar,
  Modal,
  TextInput,
  List,
  IconButton,
} from 'react-native-paper';
export default function Login({ navigation }) {
return (

  <View style = {styles.container}>
  <Text style={styles.text}>Welcome to the First page of the App! Press The Button To Continue</Text>
  <View style={styles.inputContainer}>

  <Button style = {styles.button}title="Continue" onPress={() => navigation.navigate('SecondScreen')}> Continue to Home </Button>
  </View>
  </View>
);

};


const styles=StyleSheet.create({

  container: {
  flex:1,
  padding: 10,
  backgroundColor: "#FFAC03",
},
text:{
fontSize:16,
textAlign:'center',
color:"#912203"


},
inputContainer: {
  padding:20,
  justifyContent: 'center',
backgroundColor:'#FF5C03'
},
button: {
 color:'purple'
}
,});