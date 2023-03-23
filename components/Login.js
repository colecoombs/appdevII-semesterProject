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

/*  async function Login(email, password) {
	console.log("TEST");
	const response = await fetch("http:/10.15.5.49:3000/api/user/auth", {
		method: "POST",
		body: {
			'email': email,
			'password': password,
		},
	})
		.then(async () => {
			if (response) {
				console.log("then function")
				const tokenResponse = await response.json();
				SecureStore.setItemAsync("token", tokenResponse.token);
			}
		})
		.catch((err) => {
			console.log(err);
		});
}  */

 /* export function Login(email, password) {
	const data = {
		'email': email,
		'password': password,
	};

	axios({
		method: "POST",
		url: "http:/10.15.5.49:3000/api/user/auth",
		//url: "localhost:3000/api/user/auth",
		data: data,
		headers: { "Content-Type": "application/x-ww-form-urlencoded" },
	})
		.then(async (res) => {
			console.log(JSON.stringify(res.data));
			//await SecureStore.setItemAsync("email", res.data.email);
			await SecureStore.setItemAsync("token", res.data.token);
		})
		.catch((err) => {
			console.log(JSON.stringify(err));
		});
} */

 export function Login(email, password) {
	axios.post('http:/10.15.5.49:3000/api/user/auth',{
		'email': email,
		'password': password
	})
  	.then(response => {
    	//console.log(response.data);
		//console.log("Token?")
		const tokenResponse = response.data;
		SecureStore.setItemAsync("token", tokenResponse.token);
  	})
  	.catch(error => {
    	//console.log(error);
		//console.log(email);
		//console.log(password);
  	});
}

//http:/10.0.2.2:3000/api/user/auth

export default Login;
