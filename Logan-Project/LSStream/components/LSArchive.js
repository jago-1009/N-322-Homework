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
import {
	Appbar,
	Modal,
	Icon,
	TextInput,
	List,
	IconButton,
} from "react-native-paper";
let i;
import AsyncStorage from "@react-native-async-storage/async-storage";
import BG_image from "../img/Logan_Kids_Background.png";
import YoutubePlayer from "react-native-youtube-iframe";
import * as ScreenOrientation from "expo-screen-orientation";
export default function LSArchive({ navigation, route }) {
	const playlistVidList = route.params;
	const [playlistItems, setPlaylistItems] = useState([]);
	const [videoTitle, setVideoTitle] = useState([]);
	const [videoId, setvideoId] = useState([]);
	const playlistID = route.params.videoId;
	const [playing, setPlaying] = useState(false);
	// console.log(playlistVidList)
	useEffect(() => {
		//API request
		fetch(
			`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDKndkGoDP6YdzQ7ZD9jg6WFeFLI0ZEUFw&playlistId=${playlistID}&part=snippet&maxResults=50`
		)
			.then((response) => response.json())
			.then((data) => {
				// Extract video IDs from the playlist items
				const video = data.items.map((item) => item.snippet.resourceId.videoId);
				const videoRaw = data.items.map((item) => item.snippet);
				const videoTitle = data.items.map((item) => item.snippet.title);
				// console.log(video)
				// console.log(videoTitle)
				setvideoId(video);
				setPlaylistItems(videoRaw);
				setVideoTitle(videoTitle);
				// console.log(videoRaw);
				// console.log(videoRaw)
			})
			.catch((error) => console.error("Error fetching playlist data:", error));
	}, []);

	const containerStyle = { backgroundColor: "white", padding: 20 };
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				resizeMode="cover"
				source={BG_image}
				style={{
					width: Dimensions.get("screen").width,
					height: Dimensions.get("screen").height,
				}}
			>
				<ScrollView nestedScrollEnabled={true} style={styles.container}>
					<IconButton
						icon="keyboard-backspace"
						size={40}
						style={styles.icon}
						onPress={() => {
							navigation.navigate("LoginScreen");
						}}
					/>
					<Text style={styles.header}>{playlistVidList.PlaylistName}</Text>
					{playlistItems.map((video, index) => (
						<View key={index}>
							<Text style={styles.textdebug}>{video.title}</Text>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("DetailListScreen", {
										videoId: videoId[index],
									});
								}}
							>
								<Image
									source={{ uri: video.thumbnails.high.url }}
									style={{
										width: 300,
										height: 200,
										marginBottom: 100,
										alignSelf: "center",
									}}
									resizeMode="contain"
								/>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
			</ImageBackground>

			<View></View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#31C190",
	},
	container: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.6)",
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
		backgroundColor: "rgba(49,193,144,1)",
		fontSize: 40,
		fontWeight: "bold",
		borderRadius: 30,
		marginTop: 60,
	},
	background: {
		width: Dimensions.get("screen").width,
		height: Dimensions.get("screen").height,
	},
	image: {
		flex: 1,
		height: null,
		width: null,
		alignSelf: "center",
	},
	header: {
		position: "relative",
		alignSelf: "center",
		textAlign: "center",
		fontSize: 24,
		bottom: 20,
		fontWeight: "bold",
		backgroundColor: "rgba(49,193,144,1)",
		width: 250,
		borderRadius: 30,
	},
	icon: {
		position: "relative",

		top: 25,
		backgroundColor: "rgba(49,193,144,1.7)",
	},
});
