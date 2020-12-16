import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { ListItem } from 'react-native-elements';
import {MapView, Marker} from 'react-native-maps';

export default function Info({ route, navigation }) {


return (
    <View style={styles.container}>

      <Text>lng {route.params.longitude}</Text>
      <Text>lat {route.params.latitude}</Text>
      <View style={styles.listcontainer}/>

    </View>

    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffff',
      justifyContent: 'center',
      padding: 5,
    },
    listcontainer: {
      flex: 1,
      padding: 5,
      backgroundColor: '#7BDCB5',
    },
});
  