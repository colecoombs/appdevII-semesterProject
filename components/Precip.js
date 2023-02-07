/*


*/

import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

function Precip(props) {
    return (
      <><Text style={styles.normalText}>Chance of precipitation: 3%</Text>
      <Text style={styles.normalText}>High: 48°   Low: 28°    Wind: 7mph</Text></>
    )
}

const styles = StyleSheet.create({
    normalText: {
      fontSize: 24,
      padding: 10
    },
  })

export default Precip;