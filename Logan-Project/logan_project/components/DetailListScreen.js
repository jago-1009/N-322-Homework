import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, Modal, TextInput, Button, List, IconButton } from 'react-native-paper';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('items');
    console.log("JsonValue Get", jsonValue)
     setLists([jsonValue]);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
    }
export default function DetailListScreen({navigation, route }) {
    getData();
 const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log("JsonValue Set", jsonValue)
    await AsyncStorage.setItem('items', jsonValue);
  } catch (e) {
    // saving error
  }
}
  let listObj = route.params;
  const [visible, setVisible] = useState();
  const [listItem, setListItem] = useState([])
  const [listItems, setListsItems] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
  };
  
  const addItem = () => {
    // setListItems([...listItems, { name: listName, items: [] }]);
    hideModal();
    let newListObj = {itemName: listItem}
    storeData(newListObj)
    listObj.items.push(newListObj)
  }

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <View style={styles.container}>
      <View>
        <Appbar.Header>
          <Appbar.Action icon="keyboard-backspace" onPress={() => navigation.navigate('Home')} />
          <Appbar.Content title={listObj.name} />
          <Appbar.Action icon="plus-circle-outline" onPress={showModal} />
        </Appbar.Header>
      </View>
      <View>
      <View style={styles.lists}>
        {listObj.items.map((items) => (
          <List.Item
            title={items.itemName}
            right={(props) => (
              <IconButton
                onPress={() => {
                  setListsItems(listObj.items.filter((a) => a.itemName !== listObj.items.itemName))
                  listObj.items = listItems;
                }
                }
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
        <TextInput label="Add List Item Name!" onChangeText={setListItem}/>
        <Button mode="contained" onPress={hideModal}>
          Cancel
        </Button >
        <Button onPress={addItem}>Add New List</Button>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
