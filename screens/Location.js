/*
  file: Location.js
  author: C. Coombs
  date: 03/20/2023
  
  This file is used to display the locations.

 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Location(route, navigation) {
  return (
    <View style={styles.container}>
        <Text>Location Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Location