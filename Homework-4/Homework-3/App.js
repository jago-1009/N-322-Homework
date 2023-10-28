import { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import HomeScreen from './components/HomeScreen';
import DetailListScreen from './components/DetailListScreen';
import Login from './components/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [viewDetailList, setViewDetailList] = useState(false);
  const [allLists, setAllLists] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DetailListScreen" component={DetailListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    // {!viewDetailList ? (
    //   <HomeScreen viewDetailList={setViewDetailList} allLists={setAllLists}  />

    // ) : (
    //   <DetailListScreen viewDetailList={setViewDetailList} allLists />
    // )}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ED602F',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
