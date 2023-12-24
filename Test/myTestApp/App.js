import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstScreen from "./screens/FirstScreen";
import SecondScreen from "./screens/SecondScreen";
const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="FirstScreen" component={FirstScreen} />
					<Stack.Screen name="SecondScreen" component={SecondScreen} />
				</Stack.Navigator>
				
			</NavigationContainer>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
