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
let i;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [visible, setVisible] = useState();
  const [listName, setListName] = useState();
  const [lists, setLists] = useState([]);
  const [allLists, setAllLists] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (lists.length != 0) {
      storeData();
    }
  }, []);

  const storeData = async () => {
    console.log('ASSETS SAVE DATA ', lists + ' ' + listName);
    let newArray = [];

    let newObj = { name: listName, items: [] };

    console.log('ASSETS SAVE DATA NEW OBJ', lists);
    if (lists.length != 0) {
      newArray = lists;
      newArray.push(newObj);
    } else {
      newArray.push(newObj);
    }
    await AsyncStorage.setItem('list', JSON.stringify(newArray));
    getData();
    hideModal();
  };
  const updateDeletedArray = async (filterArray) => {
    console.log('UPDATE DELETE ', filterArray);
    await AsyncStorage.setItem('list', JSON.stringify(filterArray));
    getData();
  };
  const getData = async () => {
    console.log('ASSETS GET DATA LOAD ');
    try {
      const lists = await AsyncStorage.getItem('list');
      console.log('ASSETS GET DATA LOAD ', lists);
      if (!lists) {
        console.log('NO LIST');
      } else {
        console.log('ASSETS GET DATA JSON ', JSON.parse(lists));
        setLists(JSON.parse(lists));
      }
    } catch (e) {
      console.log('ASSET GET DATA ERROR ', e);
    }
  };

  const hideModal = () => {
    setVisible(false);
  };

  const showModal = () => setVisible(true);

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.title}>
      <Appbar.Action
            icon="keyboard-backspace"
            onPress={() => navigation.navigate('Login')}
          />
        <Appbar.Content title={'Lists'}  />
        <Appbar.Action icon="plus-circle-outline" onPress={showModal} />
      </Appbar.Header>
      <View>{lists ? <Text>{lists.name}</Text> : <Text>No Data</Text>}</View>
      <View style={styles.lists}>
        {lists.map((list, idx) => (
          <List.Item
            style={styles.lists}
            title={list.name}
            onPress={() =>
              navigation.navigate('DetailListScreen', {
                name: list.name,
                index: idx,
                items: list.items,
              })
            }
            right={(props) => (
              <IconButton
                onPress={() => {
                  setLists(lists.filter((a) => a.name !== list.name));
                  updateDeletedArray(lists.filter((a) => a.name !== list.name));
                }}
                icon="delete"
                size={20}
              />
            )}
          />
        ))}
      </View>

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Text style={styles.paragraph}>
          You can add your new list name here!!
        </Text>
        <TextInput label="Add List Name!" onChangeText={setListName} />
        <Button mode="contained" onPress={hideModal} style={styles.title}>
          Cancel
        </Button>
        <Button onPress={storeData}>Add New List</Button>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    backgroundColor:'#FF5C03',
    color:"#fff"
  },
  container: {
    flex: 1,
    backgroundColor: '#FFAC03',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lists: {
    backgroundColor: '#BF9032',
  },
});
