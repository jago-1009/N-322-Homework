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
} from "react-native";
import { Appbar, Modal, TextInput, List, IconButton } from "react-native-paper";
let i;
import AsyncStorage from "@react-native-async-storage/async-storage";
import BG_image from "../img/Logan_Kids_Background.png";
import YoutubePlayer from "react-native-youtube-iframe";

export default function WelcomeScreen({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.SafeArea}>
				<View style={styles.container}>
					<ImageBackground
						resizeMode="cover"
						source={BG_image}
						style={{
							width: Dimensions.get("screen").width,
							height: Dimensions.get("screen").height,
						}}
					>
						<View style={styles.container}>
							<Image
								style={styles.image}
								source={require("../img/379455400_283164724494435_7414287126426920948_n.png")}
							></Image>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("AccountScreen", {});
								}}
							>
								<Text style={styles.subtitle}>Log in or Sign Up</Text>
								<TouchableOpacity
									onPress={() => {
										navigation.navigate("LoginScreen");
									}}
								>
									<Text style={styles.subtitle}>Join as Guest</Text>
								</TouchableOpacity>
							</TouchableOpacity>
						</View>
					</ImageBackground>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#31C190",
	},
	container: {
		flex: 1,
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
	SafeArea: { backgroundColor: "#31C190" },
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
