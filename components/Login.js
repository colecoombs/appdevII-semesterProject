/*
  file: HomeScreen.js
  author: C. Coombs
  date: 02/03/2023
  
  This file is used to login to the app. It makes an API call to the server side using the "auth" route
  
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

const config = require("../configuration/config.json");
//const jwt = require("jwt-simple");


export function Login(email, password) {
	axios
		.post("http:/192.168.1.29:3000/api/user/auth", {
			email: email,
			password: password,
		})
		// success
		.then((response) => {
			const tokenResponse = response.data;
			//const user = jwt.decode(tokenResponse.data, config.secret);
			SecureStore.setItemAsync("token", tokenResponse.token);
		})
		// errors
		.catch((error) => {
		});
}

export function getEmail(email) {
	return email;
}

export default Login;
