import { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import KidsScreen from './components/KidsScreen';
import DetailListScreen from './components/DetailListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [viewDetailList, setViewDetailList] = useState(false);
  const [allLists, setAllLists] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
         screenOptions={{
    headerShown: false
  }}>
          <Stack.Screen name = "Kids" component={KidsScreen} />
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
    backgroundColor: '#31C190',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
