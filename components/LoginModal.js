/*
  file: LoginModal.js
  author: C. Coombs
  date: 04/10/2023
  
  This file is used to login to the app. It will also provide utility for signing up if the user
  does not have an account with the application yet.
  
  Modifications:

 */

import React, { useEffect, useState, } from "react";
import { View, Text, StyleSheet, Modal, Button, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Login from "../components/Login";
import { useIsFocused } from "@react-navigation/native";
  
export default function LoginModal() {

    const [authenticated, setAuthenticated] = useState(false);
	const [emailInput, setEmailInput] = useState("");
	const [passInput, setPassInput] = useState("");
    const isFocused = useIsFocused();

    // Used to check if token is valid each time you re-visit the page
    useEffect(() => {
        checkTokenAgain()
    },[isFocused])

	const checkToken = async () => {
		console.log('Checking token');
        // Result fetches token
        let result = await SecureStore.getItemAsync("token");
		if (!result) {
			setAuthenticated(false);
			
		} 
        else {
            setAuthenticated(true);
	    }
    }

    // utility function used during the useEffect when the page is re-visited. 
    const checkTokenAgain = async () => {
        let result = await SecureStore.getItemAsync("token");
        if (result && isFocused) {
            // Axios Call
            // If Token is good, set auth to true
            // If your token is bad, set auth to false
            let tokenURL = `http:/10.15.6.93:3000/api/data/load_data`
            let storedToken = result;
            await axios({
                method: "get",
                url: tokenURL,
                headers: {
                    "x-auth": storedToken,
                },
            })
            .then((response) => {
                // If token is valid, show journal
                if (response.status == 200) {
                    setAuthenticated(true);
                }
                // token has expired, hide journal page
                else {
                    setAuthenticated(false);
                }
            })
            // Server error
            .catch((error) => {
                setAuthenticated(false);
                console.log(error);
            });	
        }
        // If no token is present and the Journal screen is focused, hide journal contents
        else if (isFocused){
            setAuthenticated(false)
        }
    };

    // function to handle the Login button
	const handlePress = () => {
		let email = emailInput;
		let pass = passInput;
		Login(email, pass);
		checkToken();
	};

    return (
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
    )
  }


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

  