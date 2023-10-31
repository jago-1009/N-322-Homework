import { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import FirstScreen from './components/FirstScreen';
import SecondScreen from './components/SecondScreen';
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
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
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
