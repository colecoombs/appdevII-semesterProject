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
	05/03/2023: added an axios call to the server side to retrive 10 journal entries
              added a loop to show the 10 journal entries in a touchable opacity
              scroll view
              added a useEffect to render the journal page each time it is clicked on

 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import LoginModal from "../components/LoginModal";
import { useIsFocused } from "@react-navigation/native";
import {MaterialCommunityIcons} from '@expo/vector-icons/';
import Ionicons from '@expo/vector-icons/Ionicons';

function Journal() {
  const isFocused = useIsFocused();
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Loads 
  const loadJournalEntries = async () => {
    setLoading(true);
    const token = await SecureStore.getItemAsync("token");
    try {
      const response = await axios.get(
        `http:/10.15.6.93:3000/api/data/load_data`,
        {
          headers: {
            "x-auth": token,
          },
        }
      );
      setJournalEntries(response.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getTokenAndLoadEntries = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        loadJournalEntries();
      }
    };
    getTokenAndLoadEntries();
  }, [isFocused]);

  return (
    <View style={styles.container}>
		  <LoginModal/>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading entries...</Text>
        ) : journalEntries.length > 0 ? (
          journalEntries.map((entry) => (
            <TouchableOpacity
              style={styles.entryContainer}
              key={entry.jid}
              onPress={() => {
                // Add code to open the journal entry
              }}
            >
              <View style = {styles.row}>
                <MaterialCommunityIcons name={'book-open-page-variant-outline'} size={32}></MaterialCommunityIcons>
                <Text style={[styles.entryTitle, {flexGrow: 1, marginLeft: 10}]}>{entry.title}</Text>
			          <Text style={styles.entryTitle}>{new Date(entry.date_of_entry).toLocaleDateString()}</Text>
              </View>
              <Text style={styles.entryText}>{entry.journal_entry}</Text>
            </TouchableOpacity>
            
          ))
          
        ) : (
          <Text style={styles.noEntriesText}>
            You haven't made any journal entries yet!
          </Text>
        )}
      </ScrollView>
        <View style={styles.plus}>
          <Ionicons name='md-add' size={32} color='black'/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
	justifyContent: "center"
  },
  entryContainer: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "95%",
  },
  entryTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  entryText: {
    fontSize: 18,
	justifyContent: "space-between",
  },
  loadingText: {
    marginVertical: 20,
    fontSize: 18,
  },
  noEntriesText: {
    marginVertical: 20,
    fontSize: 18,
    fontStyle: "italic",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  plus: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderRadius: 50,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});

export default Journal;
