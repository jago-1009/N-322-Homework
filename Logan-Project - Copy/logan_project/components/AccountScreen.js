import React, { useState, useEffect, useCallback, useRef } from "react";
import {
	Button,
	ScrollView,
	TouchableOpacity,
	FlatList,
	View,
	Alert,
	Text,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	Dimensions,
	Image,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { Appbar, Modal, TextInput, List, IconButton } from "react-native-paper";
let i;
import BG_image from "../img/Logan_Kids_Background.png";
import { firebase, auth } from "../firebaseConfig";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
export default function AccountScreen({ navigation }) {
	const [signInUsername, setSignInUsername] = useState();
	const [signInPassword, setSigninPassword] = useState();
	const [createUsername, setCreateUsername] = useState();
	const [createPassword, setCreatePassword] = useState();
	const [Loading, setLoading] = useState(false);
	const createUser = async () => {
		setLoading(true);
		try {
			await createUserWithEmailAndPassword(auth, createUsername, createPassword)
				.then((userCredential) => {
					console.log("NEW USER CREATED");
					setCreateUsername("");
					setCreatePassword("");
					setLoading(false);
					navigation.navigate("LoginScreen");
				})
				.catch((error) => {
					console.log("ERROR:", error.message);
					Alert.alert("ERROR AT", error.message);
					setLoading(false);
				});
		} catch (error) {
			console.log("TRY ERROR:", error.message);
			setLoading(false);
		}
	};
	const signInUser = async () => {
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, signInUsername, signInPassword)
				.then((userCredential) => {
					console.log("SIGNED IN");
					setSignInUsername("");
					setSigninPassword("");
					navigation.navigate("LoginScreen");
				})
				.catch((error) => {
					console.log("ERROR:", error.message);
					setLoading(false);
					Alert.alert("ERROR AT", error.message);
				});
		} catch (error) {
			console.log("TRY ERROR:", error.message);
			setLoading(false);
		}
	};
	const ChannelID = "UC_JwOuH8Te6IOexL2QwnroQ";

	const containerStyle = { backgroundColor: "white", padding: 20 };
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.container}>
				<View style={styles.container}>
					<View>
						<ImageBackground
							resizeMode="cover"
							source={BG_image}
							style={{
								width: Dimensions.get("screen").width,
								height: Dimensions.get("screen").height,
							}}
						>
							<IconButton
								icon="keyboard-backspace"
								style={styles.icon}
								onPress={() => {
									navigation.navigate("WelcomeScreen");
								}}
							></IconButton>

							<Text style={styles.text}>Need to log in? You can here!</Text>

							<TextInput
								style={styles.textInput}
								label="Email"
								onChangeText={setSignInUsername}
								value={signInUsername}
							></TextInput>
							<TextInput
								style={styles.textInput}
								secureTextEntry={true}
								label="Password"
								onChangeText={setSigninPassword}
								value={signInPassword}
							></TextInput>
							<Pressable
								onPress={() => {
									signInUser();
								}}
							>
								<Text style={styles.subtitle}>Sign In</Text>
							</Pressable>
							<Text style={styles.text}>Or you can sign up here!</Text>
							<TextInput
								style={styles.textInput}
								onChangeText={setCreateUsername}
								value={createUsername}
								label="Username"
							></TextInput>
							<TextInput
								style={styles.textInput}
								secureTextEntry={true}
								onChangeText={setCreatePassword}
								value={createPassword}
								label="Password"
							></TextInput>
							<Pressable
								onPress={() => {
									createUser();
								}}
							>
								<Text style={styles.subtitle}>Sign Up</Text>
							</Pressable>
						</ImageBackground>
						<View
							style={{
								width: Dimensions.get("screen").width,
								height: Dimensions.get("screen").height,
								position: "absolute",
								backgroundColor: "rgba(0,0,0,0.3)",
								display: "none",
							}}
						>
							<ActivityIndicator
								size={200}
								color="#000"
								animating={Loading}
							></ActivityIndicator>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	text: {
		borderWidth: 2,
		backgroundColor: "rgba(49,193,144,0.7)",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 24,
		marginBottom: 50,
		borderRadius: 30,
		marginTop: 50,
	},
	textInput: {
		marginBottom: 20,
	},
	header: {
		backgroundColor: "#31C190",
	},
	container: {
		flex: 1,
		backgroundColor: "rgba(49,193,144,0.7)",
		height: Dimensions.get("screen").height + 100,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	lists: {
		backgroundColor: "#fff",
		color: "#000",
	},
	textdebug: {
		textAlign: "center",
		marginBottom: 20,
		backgroundColor: "rgba(49,193,144,0.7)",
		fontSize: 40,
		fontWeight: "bold",
	},
	background: {
		width: Dimensions.get("screen").width,
		height: Dimensions.get("screen").height,
	},
	image: {
		height: 200,
		width: 300,
		alignSelf: "center",
		objectFit: "contain",
	},
	header: {
		marginTop: 30,
		fontSize: 30,
		textAlign: "center",
		alignSelf: "center",
	},
	subtitle: {
		borderWidth: 2,
		marginTop: 50,
		textAlign: "center",
		alignSelf: "center",
		fontSize: 24,
		backgroundColor: "rgba(49,193,144,0.9)",
		width: 300,
		height: 40,
		borderRadius: 30,
	},
	icon: {
		backgroundColor: "rgba(0,0,0,0.2)",
		tintColorcolor: "rgba(49,193,144,1)",
	},
});
