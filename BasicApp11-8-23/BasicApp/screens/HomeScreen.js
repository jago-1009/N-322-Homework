import { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, List } from "react-native-paper";
import LoginScreen from "./LoginScreen";
export default function HomeScreen({ navigation }) {
	const [SignInUsername, setSignInUsername] = useState();
	const [SignInPassword, setSignInPassword] = useState();
	const [createUsername, setCreateUsername] = useState();
	const [createPassword, setCreatePassword] = useState();
	const [createFName, setCreateFName] = useState();
	const [createLName, setCreateLName] = useState();

	const signInUser = async () => {
		setSignInUsername("");
		setSignInPassword("");
	};
	const createUser = async () => {
		setCreateUsername("");
		setCreatePassword("");
		setCreateFName("");
		setCreateLName("");
	};

	return (
		<ScrollView style={styles.container}>
			<View>
				<Text style={styles.header}>Sign In</Text>
				<TextInput
					style={styles.input}
					label="Username"
					onChangeText={setSignInUsername}
					value={SignInUsername}
				/>
				<TextInput
					style={styles.input}
					label="Password"
					secureTextEntry={true}
					onChangeText={setSignInPassword}
					value={SignInPassword}
				/>
				<Button onPress={signInUser} style={styles.button} mode="contained">
					Sign In
				</Button>
				<View>
					<Text style={styles.buffer}>OR</Text>
				</View>
				<View>
					<TextInput
						style={styles.input}
						label="First Name"
						onChangeText={setCreateFName}
						value={createFName}
					/>
					<TextInput
						style={styles.input}
						label="Last Name"
						onChangeText={setCreateLName}
						value={createLName}
					/>
					<TextInput
						style={styles.input}
						label="Username"
						onChangeText={setCreateUsername}
						value={createUsername}
					/>
					<TextInput
						style={styles.input}
						label="Password"
						secureTextEntry={true}
						nChangeText={setCreatePassword}
						value={createPassword}
					/>
					<Button style={styles.button} mode="contained" onPress={createUser}>
						Create Account
					</Button>
				</View>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
	},
	header: {
		fontFamily: "serif",
		alignSelf: "center",
		fontSize: 30,
	},
	input: {
		marginTop: 10,
	},
	button: {
		marginTop: 10,
	},
	buffer: {
		fontFamily: "serif",
		margin: 20,
		fontSize: 30,
		alignSelf: "center",
	},
});
