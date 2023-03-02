/*
  file: Weather.js
  author: C. Coombs
  date: 02/03/2023
  
  The functions in this file provide for setting the date, current temp., feels like temp,
  chance of precipitation, high, low and wind speed. It is also responsible for determining
  what image to set depending on the current weather

  API reference: https://openweathermap.org/data/2.5/weather
  Key: d95207455d6fbc8aa3659b659f721c47
  
  Modifications:
      02/10/2023 - Added the API to fetch the current weather conditions
      02/14/2023 - Changed the previously hard coded weather values and date for the current
        weather to update with the correct information from the API call
  
  TO DO:
      Find out how to get the State name from the API call to go with the city name.        
 */

import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// The api call to the OpenWeather website to get the current weather
export function GetWeather() {
    const apiKey = 'd95207455d6fbc8aa3659b659f721c47';
    const [weather, setWeather] = useState({reqDT: 1, description: '', temp: 0});
    const [zip, setZip] = useState('65802');

    // Url for the website
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=imperial`;
    console.log(url);

    useEffect(() => {
        axios
        .get(url)
        .then(res => {
            // Different fields used to display the current conditions
            setWeather({ ...weather,
                reqDT: dayjs(new Date(res.data.dt * 1000)).format('ddd, MMM D'),
                description: res.data.weather[0].description,
                temp: res.data.main.temp,
                id: res.data.weather[0].id,
                feels: res.data.main.feels_like,
                min: res.data.main.temp_min,
                max: res.data.main.temp_max,
                wind: res.data.wind.speed,
                city: res.data.name,
                state: '',
                humidity: res.data.main.humidity,
                weatherCode: res.data.weather[0].main,
              });
              console.log(JSON.stringify(res.data));
              console.log(res.data.dt);
              console.log(JSON.stringify(weather));
              console.log('Weather code: ', weather.weatherCode);
              console.log('Weather ID: ', weather.id);
        })
        .catch(err=> {
            console.log(err);
        })
    },[zip])
    if (weather.reqDT!==1)
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.city}>{weather.city}, {weather.state}</Text>
        </View>
      <View style={styles.row}>
          <View style={styles.row}>
            <Image id='image'
            source={getWeatherImage(weather.weatherCode, weather.id, weather.wind)}
            style={styles.resize}
            />
          </View>
        <View style={styles.row}>
          <View style={styles.colTop}>
            <Text style={styles.normalText}>{weather.reqDT}</Text>
            <Text style={styles.boldText}>{Math.round(weather.temp)}&deg;F</Text>
            <Text style={styles.normalText}>Feels like {Math.round(weather.feels)}&deg; F</Text>
          </View>
        </View>
      </View>
        <View style={styles.col}>
          <Text style={styles.normalText}>Humidity: {weather.humidity}%</Text>
          <Text style={styles.normalText}>High: {Math.round(weather.max)}&deg;   Low: {Math.round(weather.min)}&deg;    Wind: {Math.round(weather.wind)}mph</Text>
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
    else
    return (
      <View>
          <Text>Loading ...</Text>
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

// Different stylesheets
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
  },
  
  resize: {
    width: 240,
    height: 160,
    resizeMode: 'contain'
  },
});