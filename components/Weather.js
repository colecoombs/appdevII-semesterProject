/*
  file: Weather.js
  author: C. Coombs
  date: 02/03/2023
  
  The functions in this file provide for setting the date, current temp., feels like temp,
  chance of precipitation, high, low and wind speed. It is also responsible for determining
  what image to set depending on the current weather
  
  Modifications:
      03/15/2023: Removed axios call and set this component as a prop to return
        the current weather conditions
      
 */

import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

// Props function to return the main weather component and information for the current day
function GetCurrentWeather(props) {
  return (
    <View style={styles.colTop}>
      <Text style={styles.normalText}>{props.date}</Text>
      <Text style={styles.boldText}>{Math.round(props.temp)}&deg;F</Text>
      <Text style={styles.normalText}>Feels like {Math.round(props.feels)}&deg; F</Text>
    </View>
  )
}

// Different stylesheets
const styles = StyleSheet.create({
  
  normalText: {
    fontSize: 24,
  },
  boldText: {
    fontSize: 45,
    fontWeight: 'bold'
  },

  colTop: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
    flexGrow: 2,
    paddingTop: 30,
  },
});

export default GetCurrentWeather;