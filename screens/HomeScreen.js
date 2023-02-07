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
import Images from '../components/WeatherImage';
import Temp from '../components/WeatherTemp';
import Precip from '../components/Precip';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
          <Text style={styles.city}>Springfield, MO</Text>
      </View>
      <View style={styles.row}>
          <View style={styles.row}>
            <Images></Images>
          </View>
          <View style={styles.row}>
            <View style={styles.colTop}> 
              <Temp></Temp>
            </View>
          </View>
      </View>
      <View style={styles.col}>
        <Precip></Precip>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
            <View style={styles.col}>
                <Text style={styles.futureCast}>Sun 15</Text>
                <MaterialCommunityIcons name="weather-windy" size={40} color="black"/>
                <Text style={styles.futureCast}>54</Text>
                <Text style={styles.futureCast}>48</Text>
                <Text style={styles.futureCast}>41%</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.futureCast}>Mon 16</Text>
                <MaterialCommunityIcons name="weather-partly-cloudy" size={40} color="black" />
                <Text style={styles.futureCast}>63</Text>
                <Text style={styles.futureCast}>35</Text>
                <Text style={styles.futureCast}>43%</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.futureCast}>Tue 17</Text>
                <MaterialCommunityIcons name="weather-pouring" size={40} color="black" />
                <Text style={styles.futureCast}>54</Text>
                <Text style={styles.futureCast}>40</Text>
                <Text style={styles.futureCast}>43%</Text>
            </View>
            <View style={styles.col}>
                <View style={styles.normalText}>
                  <Text style={styles.futureCast}>Wed 18</Text>
                  <MaterialCommunityIcons name="weather-pouring" size={40} color="black" />
                  <Text style={styles.futureCast}>52</Text>
                  <Text style={styles.futureCast}>35</Text>
                  <Text style={styles.futureCast}>80%</Text>
                </View>
            </View>
        </View>
      </View>
    </View>
    

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