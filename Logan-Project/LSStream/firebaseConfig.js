// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";

import {
	getAuth,
	initializeAuth,
	getReactNativePersistence,
} from "firebase/auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyArNTcutEl7_T8edaxiydAZ9OETLtgEwtU",
	authDomain: "n322-jacogarw.firebaseapp.com",
	projectId: "n322-jacogarw",
	storageBucket: "n322-jacogarw.appspot.com",
	messagingSenderId: "467906406613",
	appId: "1:467906406613:web:697c523391f04d037d9a5c",
	measurementId: "G-SEK40FD9L5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const auth = getAuth(app);
export { app, auth, getApp, getAuth };
