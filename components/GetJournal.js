/*
  file: getJournal.js
  author: C. Coombs
  date: 03/10/2023
  
  This file is used to generate the journal screen for a user that is signed in
  
  Modifications:

 */

import React from 'react'
import {Text, View, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import axios from 'axios';

export function getJournal() {
  console.log("Testing");
	axios
		.post("http:/10.15.5.49:3000/api/data/load_data", {

		})
		.then((response) => {
        if (response.status===200) {
          
        }
		})
		.catch((error) => {
        res.status()
		});
}

export default getJournal;
