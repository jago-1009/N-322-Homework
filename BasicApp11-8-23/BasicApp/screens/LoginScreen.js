import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, List } from "react-native-paper";
export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
       <Button onPress={() => {navigation.navigate("HomeScreen")}}>Go to Home</Button>
        
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20
  },
});