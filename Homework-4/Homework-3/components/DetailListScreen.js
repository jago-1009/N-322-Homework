import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Appbar,
  Modal,
  TextInput,
  Button,
  List,
  IconButton,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
let lists;
let data;

export default function DetailListScreen({ navigation, route }) {
  let listObj = route.params;
  console.log('LISTOBJ', listObj);

  const [visible, setVisible] = useState();
  const [listItem, setListItem] = useState([]);
  const [listItems, setListsItems] = useState([]);
  const [listData, setListData] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const updateDeletedItem = async (filterArray, idx) => {
    filterArray.splice(idx, 1);
    console.log('FILTER', filterArray, idx);
    await AsyncStorage.setItem('list', JSON.stringify(data));
    getData();
  };
  const getData = async () => {
    try {
      lists = await AsyncStorage.getItem('list');

      console.log('ASSETS GET DATA LOAD ', lists);
      if (!lists) {
        console.log('NO LIST');
      } else {
        data = JSON.parse(lists);
        console.log('ASSETS GET DATA JSON ', JSON.parse(lists));
        setListData(data[listObj.index].items);
      }
    } catch (e) {
      console.log('ASSET GET DATA ERROR ', e);
    }
  };
  const storeData = async () => {
    let newListObj = { itemName: listItem };
    console.log('ASSETS SAVE DATA ', newListObj);
    console.log('SAVE DATA', data[listObj.index]);
    data[listObj.index].items.push(newListObj);
    hideModal();
    await AsyncStorage.setItem('list', JSON.stringify(data));

    getData();
  };

  const addItem = () => {
    // setListItems([...listItems, { name: listName, items: [] }]);
    let newListObj = { itemName: listItem };
    listObj.items.push(newListObj);
  };

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <View style={styles.container}>
      <View>
        <Appbar.Header style={styles.title}>
          <Appbar.Action
            icon="keyboard-backspace"
            onPress={() => navigation.navigate('Home')}
          />
          <Appbar.Content title={listObj.name} />
          <Appbar.Action icon="plus-circle-outline" onPress={showModal} />
        </Appbar.Header>
      </View>
      <View style={styles.title}>
        <View style={styles.lists}>
          {listData.map((items, idx) => (
            <List.Item
              title={items.itemName}
              right={(props) => (
                <IconButton
                  onPress={() => {
                    updateDeletedItem(listData, idx);

                    setListData(listData.filter((a) => a.name !== items.name));
                  }}
                  icon="delete"
                  size={20}
                />
              )}
            />
          ))}
        </View>
      </View>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Text style={styles.paragraph}>
          You can add items to your list here!!
        </Text>
        <TextInput label="Add List Item Name!" onChangeText={setListItem} />
        <Button mode="contained" onPress={hideModal}  style={styles.title}>
          Cancel
        </Button>
        <Button onPress={storeData}>Add New List</Button>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
    backgroundColor:'#ED602F',
    color:"#fff"
  },
  container: {
    flex: 1,
    backgroundColor:"#BF9032"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lists: {
    backgroundColor: '#CC962B',
  },
});
