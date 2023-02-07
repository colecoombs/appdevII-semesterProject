/*
  file: WeatherTemp.js
  author: C. Coombs
  date: 02/03/2023
  
  The functions in this file provide for retrieving the current weather
  from Open Weather Map by zip code.

  API reference: https://openweathermap.org/data/2.5/weather
  Key: d95207455d6fbc8aa3659b659f721c47
  
  Modifications:
  
 */

import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

//fetch('https://openweathermap.org/data/2.5/weather')

function Temp(props) {
  return (
    <><Text style={styles.normalText}>Jan 14, 2023</Text>
    <Text style={styles.boldText}>45° F</Text>
    <Text style={styles.normalText}>Feels like 45° F</Text></>
  )
}

function getInfo() {

}

const styles = StyleSheet.create({
  normalText: {
    fontSize: 24,
  },

  boldText: {
    fontSize: 45,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 8,
  },
})

export default Temp;