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
	05/03/2023: 

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

function Journal() {
  const isFocused = useIsFocused();
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(false);

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
		<LoginModal />
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
              <Text style={styles.entryTitle}>{entry.title}</Text>
			        <Text style={styles.entryTitle}>{new Date(entry.date_of_entry).toLocaleDateString()}</Text>
              <Text style={styles.entryText}>{entry.journal_entry}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noEntriesText}>
            You haven't made any journal entries yet!
          </Text>
        )}
      </ScrollView>
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
    width: "100%",
    maxWidth: 500,
  },
  entryTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  entryText: {
    fontSize: 16,
	justifyContent: "space-between",
	flex: "row"
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
});

export default Journal;
