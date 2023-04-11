/*
  file: HomeScreen.js
  author: C. Coombs
  date: 02/03/2023
  
  This file is used to login to the app. It will also provide utility for signing up if the user
  does not have an account with the application yet.
  
  Modifications:

 */

import React from "react";
import {
	Text,
	View,
	Image,
	StyleSheet,
	ActivityIndicator,
	FlatList,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export function Login(email, password) {
	axios
		.post("http:/10.15.15.60:3000/api/user/auth", {
			email: email,
			password: password,
		})
		.then((response) => {
			//console.log(response.data);
			//console.log("Token?")
			const tokenResponse = response.data;
			SecureStore.setItemAsync("token", tokenResponse.token);
		})
		.catch((error) => {
			//console.log(error);
			//console.log(email);
			//console.log(password);
		});
}

export default Login;
