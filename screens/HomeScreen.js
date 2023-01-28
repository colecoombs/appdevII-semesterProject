import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import placeholder from '../assets/placeholder.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
          <Text style={styles.city}>Springfield, MO</Text>
      </View>
      <View style={styles.row}>
          <View style={styles.row}>
          <Image
          source={require('../assets/placeholder.jpg')}
          style={{width: 250, height: 135,}}
          />
          </View>
          <View style={styles.row}>
            <View style={styles.col}> 
              <Text style={styles.normalText}>Jan 14, 2023</Text>
              <Text style={styles.boldText}>45° F</Text>
              <Text style={styles.normalText}>Feels like 45° F</Text>
            </View>
          </View>
      </View>
      <View style={styles.col}>
        <Text style={styles.normalText}>Chance of precipitation: 3%</Text>
        <Text style={styles.normalText}>High: 48°   Low: 28°    Wind: 7mph</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
            <View style={styles.col}>
                <Text style={styles.futureCast}>Sun 15</Text>
                <MaterialCommunityIcons name="weather-windy" size={40} color="black" />
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
      paddingLeft: 20,
      paddingTop: 10,
    },
    image: {
      flex: 1,
      alignItems: 'center',
      paddingRight: 60,
    },
    col: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    futureCast: {
      fontSize: 25,
    }
  });

export default HomeScreen