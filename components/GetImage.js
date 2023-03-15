/*
    File: getImage.js
    Author: C. Coombs
    Date: 03/10/2023

    This file is a prop component to determine what image to display on the home screen.
    It wil then return that image to display on the screen with the correct styling.

    Modifications:


*/

import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

// Prop function to return the image
function getImage(props) {
  return (
        <View style={styles.row}>
            <Image id='image'
            source={getWeatherImage(props.weatherCode, props.id, props.wind)}
            style={styles.resize}
            />
        </View>
  )
}

// Function used to determine what weather image to show
function getWeatherImage(weatherCode, weatherId, wind) {
    if ((weatherCode === 'Clouds' || weatherCode === 'Clear') && (wind > 35)) {
      return require('../assets/windy.png');
    }
    else if (weatherId === 803 || weatherId === 804) {
      return require('../assets/cloudy.png');
    }
    else if (weatherId === 801 || weatherId === 802) {
      return require('../assets/partlyCloudy.jpg');
    } 
    else if (weatherCode === 'Rain' || weatherCode === 'Drizzle' || weatherCode === 'light rain') {
      return require('../assets/rain.png');
    }
    else if (weatherCode === 'Snow') {
      return require('../assets/snow.png');
    }
    else if (weatherCode === 'Thunderstorm') {
      return require('../assets/thunderstorm.png');
    }
    else if (weatherCode ==='Clear') {
      return require('../assets/sunny.png');
    }
    else {
      return require('../assets/mist.png');
    }
}

// Styles
const styles = StyleSheet.create ({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
        alignContent: 'center'
      },

      resize: {
        width: 240,
        height: 160,
        resizeMode: 'contain'
      },
})

export default getImage