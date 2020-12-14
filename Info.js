import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TextInput, Button} from 'react-native';
import getSportPlaces from './Search';
import {MapView, Marker} from 'react-native-maps';

export default function Info({ route, navigation }) {


return (
    <View style={styles.container}>
      <Text>lng {route.params.longitude}</Text>
      <Text>lat {route.params.latitude}</Text>
      <View style={styles.listcontainer}>
    
   
      </View>
    </View>

    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 5,
    },
  
    listcontainer: {
      flex: 1,
      padding: 5,
      backgroundColor: '#81C784',
    },
});
  