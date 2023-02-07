/*
  file: WeatherImage.js
  author: C. Coombs
  date: 02/03/2023
  
  The functions in this file provide for

  API reference: https://openweathermap.org/data/2.5/weather
  Key: d95207455d6fbc8aa3659b659f721c47
  
  Modifications:
  
 */

import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

/*fetch('https://openweathermap.org/data/2.5/weather', {
  method: 'GET',
  body: JSON.stringify
})
*/


function Images(props) {
  return (
    <Image id='image'
    source={getWeatherImage()}
    style={styles.resize}
    />
  )
}

function getWeatherImage() {
    let weatherCode;
    weatherCode = 1;
    if (weatherCode === 1) {
      return require('../assets/sunny.png');
    }
    else if (weatherCode === 2) {
      return require('../assets/cloudy.png');
    }
    else if (weatherCode === 3) {
      return require('../assets/partlyCloudy.jpg');
    } 
    else if (weatherCode === 4) {
      return require('../assets/rain.png');
    }
    else if (weatherCode === 5) {
      return require('../assets/snow.png');
    }
    else if (weatherCode === 6) {
      return require('../assets/thunderstorm.png');
    }
    else {
      return require('../assets/windy.png');
    }
}

const styles = StyleSheet.create({
  resize: {
    width: 240,
    height: 160,
    resizeMode: 'contain'
  },
})
export default Images;