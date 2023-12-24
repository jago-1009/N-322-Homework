import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, List } from "react-native-paper";

export default function FirstScreen({navigation}) {
	return (
		<View style={styles.container}>
			<Text>FirstScreen</Text>
			  <Button title="GoForward" onPress={() => navigation.navigate('SecondScreen')}>Go to Second Screen </Button>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
