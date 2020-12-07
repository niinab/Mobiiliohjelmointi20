import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TextInput} from 'react-native';
import {Card, Button, Header, ListItem } from 'react-native-elements';
import { NavigationContainer} from'@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';


export default function Info({ route, navigation }) {
const { info } = route.params;


return (
    <View style={styles.container}>
      <Text>This is Info page</Text>

      <View style={styles.listcontainer}>
    
      <FlatList
      data={info}
      ListHeaderComponent={<Text style={styles.listcontainer}>Info</Text>}
      renderItem={({ item }) => <Text>{item.name}, {item.description} </Text>}>
        <Button onPress={()  => navigation.navigate('Mainpage')} />
      </FlatList>
   
      </View>
    </View>

    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
  listcontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#81C784',

  }, 
  });
  