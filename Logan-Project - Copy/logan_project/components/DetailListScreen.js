import React, { useState, useEffect, useCallback, useRef } from "react";
import {
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
	TextInput,
	List,
	IconButton,
	Button,
} from "react-native-paper";
let i;
import AsyncStorage from "@react-native-async-storage/async-storage";
import BG_image from "../img/Logan_Kids_Background.png";
import YoutubePlayer from "react-native-youtube-iframe";

export default function DetailListScreen({ navigation, route }) {
	let VidList = route.params;
	// console.log(VidList);
	const [playing, setPlaying] = useState(false);

	const onStateChange = useCallback((state) => {
		if (state === "ended") {
			setPlaying(false);
			Alert.alert("video has finished playing!");
		}
	}, []);

	const togglePlaying = useCallback(() => {
		setPlaying((prev) => !prev);
	}, []);
	return (
		<View style={styles.container}>
			<ImageBackground
				resizeMode="cover"
				source={BG_image}
				style={styles.background}
			>
				<View
					style={{
						backgroundColor: "rgba(0,0,0,0.6)",
						width: Dimensions.get("screen").width,
						height: Dimensions.get("screen").height,
					}}
				>
					<View style={{ flex: 1, justifyContent: "center" }}>
						<YoutubePlayer
							height={300}
							play={playing}
							videoId={VidList.videoId}
							onChangeState={onStateChange}
						/>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								navigation.navigate("LSArchive");
							}}
						>
							<Text style={styles.buttonWrap}>Go Back</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	lists: {
		backgroundColor: "#aaa",
	},
	background: {
		width: Dimensions.get("screen").width,
		height: Dimensions.get("screen").height,
	},
	button: {
		color: "#26332F",
		alignSelf: "center",
		textAlign: "center",
		width: 100,
		backgroundColor: "#31C190",
		borderRadius: 30,
	},
	buttonWrap: {
		height: 50,
		alignSelf: "center",
		textAlign: "center",
		marginTop: "10%",
		fontSize: 24,
		color: "#192320",
		fontWeight: "bold",
	},
});
