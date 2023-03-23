/*
  file: Journal.js
  author: C. Coombs
  date: 03/20/2023
  
  This file is used to display the journal screen if the user is logged in and has
  a valid token or display a login modal if not.

  Modification Log: 
	03/22/2023: added a useState hook to determine if modal should be shown
				added a Login import to route the login to the correct API
				added a function (checkToken) to check for a token
				added a function (handlePress) to handle the button press on the
				login modal
				added a function (getToken) to retrieve token from SecureStore

 */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Button, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Login from "../components/Login";

export function Journal() {
	const [authenticated, setAuthenticated] = useState(false);
	const [emailInput, setEmailInput] = useState("");
	const [passInput, setPassInput] = useState("");

	const checkToken = async () => {
 		let token = await getToken();
		//console.log(`Token is: ${token}`);
		if (!token) {
				setAuthenticated(false);
			
		} else {
			
				setAuthenticated(true);
			
		}
	}

	const handlePress = () => {
		let email = emailInput;
		let pass = passInput;
		Login(email, pass);
		checkToken();
	};


	return (
		<View style={styles.container}>
			<Modal
				title="LoginModal"
				transparent={true}
				visible={!authenticated}
				animation="none"
			>
				<View style={styles.container}>
					<TextInput
						style={styles.textField}
						placeholder="Email"
						id="email"
						value={emailInput}
						onChangeText={(text) => setEmailInput(text)}
					></TextInput>
					<TextInput
						id="pass"
						style={styles.textField}
						placeholder="Password"
						secureTextEntry={true}
						value={passInput}
						onChangeText={(passText) => setPassInput(passText)}
					></TextInput>
					<Button title="Submit" onPress={handlePress} />
				</View>
			</Modal>
			<View style={styles.container}>
				<Text>Logged in</Text>
			</View>
		</View>
	);
}

async function getToken(key) {
	let result = await SecureStore.getItemAsync("token");
	if (result) {
		//console.log(`There is a token! It is ${result}`);
		return result;
	} else {
		//console.log("No token");
	}
}

// style sheets
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	textField: {
		backgroundColor: "antiquewhite",
		borderRadius: 4,
		width: 250,
		height: 35,
		margin: 10,
	},
});

export default Journal;
