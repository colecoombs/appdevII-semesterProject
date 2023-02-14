/*
  file: HomeScreen.js
  author: C. Coombs
  date: 02/03/2023
  
  This file is used to make the home screen of the weather app. It will display current
  and future forecasts for the next 4 days.
  
  Modifications:

 */

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Images, Temp, Precip} from '../components/Weather';
import { getWeatherImage } from '../components/Weather';
import { GetWeather } from '../components/Weather';

// Function to configure the homepage of the app
function HomeScreen() {
  return (
    <GetWeather></GetWeather>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 35,
      paddingBottom: 40,
      
    },
    city: {
      fontSize: 24,
    },
    normalText: {
      fontSize: 24,
    },
    boldText: {
      fontSize: 45,
      fontWeight: 'bold'
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingTop: 10,
      alignContent: 'center'
    },
    image: {
      flex: 1,
      alignItems: 'center',
      paddingRight: 60,
      justifyContent: 'center',
    },
    col: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      rowGap: 20,
      flexGrow: 2,
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
    futureCast: {
      fontSize: 25,
      padding: 5
    },

    imageStyle: {
      width: 240,
      height: 160,
    }
  });

export default HomeScreen