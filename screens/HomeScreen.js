/*
  file: HomeScreen.js
  author: C. Coombs
  date: 02/03/2023
  
  This file is used to make the home screen of the weather app. It will display current
  and future forecasts for the next 4 days.

  API reference: https://openweathermap.org/data/2.5/weather
  Key: d95207455d6fbc8aa3659b659f721c47
  
  Modifications:
      02/10/2023 - Added the API to fetch the current weather conditions
      02/14/2023 - Changed the previously hard coded weather values and date for the current
        weather to update with the correct information from the API call
      03/15/2023: Modified heavily, created separate components for each section of the 
        Home Screen. Moved the axios call to the home screen for this purpose.

 */

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import dayjs from "dayjs";
import GetCity from "../components/GetCity";
import GetImage from "../components/GetImage";
import FutureForecast from "../components/FutureForecast";
import MiddleWeather from "../components/MiddleWeather";
import GetCurrentWeather from "../components/Weather";

// This function uses an axios call to fetch the current weather and calls on different
// functions to display this information in their respective sections
function HomeScreen() {
	const apiKey = "d95207455d6fbc8aa3659b659f721c47";
	const [weather, setWeather] = useState({
		reqDT: 1,
		description: "",
		temp: 0,
	});
	const [zip, setZip] = useState("65802");

	// Url for the website
	const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=imperial`;

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				// Different fields used to display the current conditions
				setWeather({
					...weather,
					reqDT: dayjs(new Date(res.data.dt * 1000)).format("ddd, MMM D"),
					description: res.data.weather[0].description,
					temp: res.data.main.temp,
					id: res.data.weather[0].id,
					feels: res.data.main.feels_like,
					min: res.data.main.temp_min,
					max: res.data.main.temp_max,
					wind: res.data.wind.speed,
					city: res.data.name,
					state: "",
					humidity: res.data.main.humidity,
					weatherCode: res.data.weather[0].main,
				});
				//console.log(JSON.stringify(res.data));
			})
			.catch((err) => {
				console.log(err);
				console.log("Weather");
			});
	}, [zip]);
	if (weather.reqDT !== 1)
		return (
			<View style={styles.container}>
				<View>
					<GetCity city={weather.city} zip={zip} />
				</View>
				<View style={styles.row}>
					<View style={styles.row}>
						<GetImage
							weatherCode={weather.weatherCode}
							id={weather.id}
							wind={weather.wind}
						/>
					</View>
					<View style={styles.row}>
						<GetCurrentWeather
							temp={weather.temp}
							date={weather.reqDT}
							feels={weather.feels}
						/>
					</View>
				</View>
				<MiddleWeather
					humidity={weather.humidity}
					max={weather.max}
					min={weather.min}
					wind={weather.wind}
				/>
				<View style={styles.container}>
					<View style={styles.row}>
						<FutureForecast
							date="Sun 15"
							imageName="weather-windy"
							high="54"
							low="48"
							chance="41%"
						/>
						<FutureForecast
							date="Mon 16"
							imageName="weather-partly-cloudy"
							high="63"
							low="35"
							chance="43%"
						/>
						<FutureForecast
							date="Tue 17"
							imageName="weather-pouring"
							high="54"
							low="40"
							chance="43%"
						/>
						<FutureForecast
							date="Wed 18"
							imageName="weather-pouring"
							high="52"
							low="35"
							chance="80%"
						/>
					</View>
				</View>
			</View>
		);
	else
		return (
			<View>
				<Text>Loading ...</Text>
			</View>
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
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
		fontWeight: "bold",
	},
	row: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-evenly",
		paddingTop: 10,
		alignContent: "center",
	},
	image: {
		flex: 1,
		alignItems: "center",
		paddingRight: 60,
		justifyContent: "center",
	},

	resize: {
		width: 240,
		height: 160,
		resizeMode: "contain",
	},

	col: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		rowGap: 20,
		flexGrow: 2,
	},

	colTop: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		rowGap: 20,
		flexGrow: 2,
		paddingTop: 30,
	},
	futureCast: {
		fontSize: 25,
		padding: 5,
	},

	imageStyle: {
		width: 240,
		height: 160,
	},
});

export default HomeScreen;
