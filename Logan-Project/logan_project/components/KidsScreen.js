import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import {
  Button,
  Appbar,
  Modal,
  TextInput,
  List,
  IconButton,
} from 'react-native-paper';
let i;
import AsyncStorage from '@react-native-async-storage/async-storage';
import BG_image from '../img/Logan_Kids_Background.png'
const storeData = async (value) => {
  try {
    const JSONValue = JSON.stringify(value)
    await AsyncStorage.setItem('list', JSONValue);
    console.log("JSON",JSONValue)
  } catch (e) {
    console.log("ERROR SAVING DATA")
  }
};
const loadData = async (data) => {
  try {
    console.log ("Load", data)
  setLists(data);
  }
  catch(e) {
    console.log("ERROR LOADING DATA")
  }
}
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('list');
    i = JSON.parse(jsonValue)
    console.log("Read", i)
    loadData(i)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("ERROR READING DATA")
  }
};


export default function KidsScreen({ navigation }) {
  const [visible, setVisible] = useState();
  const [listName, setListName] = useState();
  const [lists, setLists] = useState([]);
  useEffect(() => {
  
    getData()
    loadData();
}, []);

 
  const hideModal = () => {
    setVisible(false);
  };
  useEffect(() => {
    storeData(lists)
}, [lists]);

  const showModal = () => setVisible(true);
  const addItem = () => {
    setLists([...lists, { name: listName, items: [] }]);
    console.log('addItem', lists);
    hideModal();
  };

  const setList = () => {
    // viewDetailList(true)
    hideModal();
  };
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <SafeAreaView style={styles.container}>
      

      <View style={styles.lists}>
      <ImageBackground
      resizeMode="cover" source={BG_image}
       style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}>
        </ImageBackground>
      </View>

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Text style={styles.paragraph}>
          You can add your new list name here!!
        </Text>
        <TextInput label="Add List Name!" onChangeText={setListName} />
        <Button mode="contained" onPress={hideModal}>
          Cancel
        </Button>
        <Button onPress={addItem}>Add New List</Button>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header : {
backgroundColor:'#31C190'
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lists: {
    backgroundColor: '#aaa',
  },
});
