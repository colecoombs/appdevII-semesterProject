/*
    File: futureForecast.js 
    Author: C. Coombs
    Date: 03/10/2023

    This file is a prop component to return the middle weather section of the home screen.
    It will display the current humidity, max temp, min temp, and wind speed.

    Modifications:


*/

import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

// Prop function to return the current conditions
function middleWeather(props) {
  return (
        <View style={styles.col}>
          <Text style={styles.normalText}>Humidity: {props.humidity}%</Text>
          <Text style={styles.normalText}>Max: {Math.round(props.max)}&deg;   Min: {Math.round(props.min)}&deg;   Wind:{Math.round(props.wind)}mph</Text>
        </View>
    )
}

// Styles
const styles = StyleSheet.create ({
    normalText: {
        fontSize: 24,
      },

      col: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20,
        flexGrow: 2,
      },
})

export default middleWeather