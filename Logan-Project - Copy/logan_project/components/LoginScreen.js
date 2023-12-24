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
import { auth } from "../firebaseConfig";
import { Appbar, Modal, TextInput, List, IconButton } from "react-native-paper";
let i;
import AsyncStorage from "@react-native-async-storage/async-storage";
import BG_image from "../img/Logan_Kids_Background.png";
import YoutubePlayer from "react-native-youtube-iframe";

export default function LoginScreen({ navigation }) {
	const [Playlists, SetPlaylists] = useState([]);
	const [PlaylistTitles, SetPlaylistTitles] = useState([]);
	const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
	const ChannelID = "UC_JwOuH8Te6IOexL2QwnroQ";

	useEffect(() => {
		//API request
		fetch(
			`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${ChannelID}&key=AIzaSyDKndkGoDP6YdzQ7ZD9jg6WFeFLI0ZEUFw`
		)
			.then((response) => response.json())
			.then((data) => {
				// Extract Playlist IDs from the playlist items
				const channel = data.items.map((item) => item.id);
				const playlistID = data.items.map((item) => item.snippet.title);
				SetPlaylistTitles(playlistID);

				SetPlaylists(channel);
			})
			.catch((error) => console.error("Error fetching Channel data:", error));
	}, []);
	const containerStyle = { backgroundColor: "white", padding: 20 };
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
						<IconButton
							icon="account"
							style={styles.icon}
							onPress={() => {
								auth.onAuthStateChanged(function (user) {
									if (user) {
										navigation.navigate("LogOutScreen");
									} else {
										navigation.navigate("AccountScreen");
									}
								});
							}}
						></IconButton>
						<IconButton
							icon="keyboard-backspace"
							style={styles.icon}
							onPress={() => {
								navigation.navigate("WelcomeScreen");
							}}
						></IconButton>
						<View style={styles.container}>
							<Image
								style={styles.image}
								source={require("../img/379455400_283164724494435_7414287126426920948_n.png")}
							></Image>
							{PlaylistTitles.map((Playlist, index) => (
								<View key={index}>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate("LSArchive", {
												videoId: Playlists[index],
												PlaylistName: PlaylistTitles[index],
											});
										}}
									>
										<Text style={styles.subtitle}>{Playlist}</Text>
									</TouchableOpacity>
								</View>
							))}
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
