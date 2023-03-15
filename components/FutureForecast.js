/*
    File: futureForecast.js 
    Author: C. Coombs
    Date: 03/10/2023

    This file is used as a prop component to return the future forecast as a single
    day object.

    Modifications:


*/

import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Props function to return the future forecast in a column for a single day
function futureForecast(props) {
  return (
    <View>
        <View style={styles.col}>
                <Text style={styles.futureCast}>{props.date}</Text>
                <MaterialCommunityIcons name={props.imageName} size={40} color="black"/>
                <Text style={styles.futureCast}>{props.high}</Text>
                <Text style={styles.futureCast}>{props.low}</Text>
                <Text style={styles.futureCast}>{props.chance}</Text>
            </View>
    </View>
  )
}

// Style sheets
const styles = StyleSheet.create ({
    col: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20,
        flexGrow: 2,
      },

      futureCast: {
        fontSize: 25,
        padding: 5
      },
})

export default futureForecast