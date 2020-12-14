import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TextInput} from 'react-native';
import {Card, Button, Header, ListItem } from 'react-native-elements';


export default function Favorites({ navigation }) {

    const [favorite, setFavorite] = useState([]);
    const [sportplaces, setSportPlaces] = useState([]);

    useEffect(() => {
        getFavorites()
      }, []);


    const getFavorites = () => {
    fetch(`http://lipas.cc.jyu.fi/api/sports-places`)
    .then(response => response.json())
        .then(data => {
          console.log('success', data)
          setSportPlaces(data)
    })
    .catch((error) => {
        Alert.alert('something went wrong', error.message)
        });
      }

    const listSeparator = () => {
    return (
         <View style={{
        height: 1,
        width: "90%",
        backgroundColor: "#CED0CE",
        marginLeft: "5%"
    }}/>
)}


return (
    <View style={styles.container}>
      <View style={styles.listcontainer}>
      <Text style={{ textAlign: 'center', fontSize: 15, padding: 5, fontWeight: 'bold' }}>This is Favorites </Text>
    
      <FlatList
      style={{marginLeft: "5%", height: 200}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        
        <Card>
          <Card.Title>{item.name}</Card.Title>''
          <Card.Divider/>
          <Text style={{marginBottom:10, fontSize: 15}}>{item.name}</Text> 
          {/* <Text style={{marginBottom:10, fontSize: 15}}>{item.location.name}</Text> */}
          
           {/* typeCode itselle tiedoksi toistaiseksi*/}
          {/* <Text style={{marginBottom: 10, fontSize: 15}}>{item.type.typeCode}</Text> */}
          </Card>
      )}
      ItemSeparatorComponent={listSeparator} data={sportplaces} />

    </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#49514E',
        justifyContent: 'center',
        padding: 5,
      },
    
      listcontainer: {
        flex: 1,
        padding: 5,
        backgroundColor: '#7BDCB5',
      },
});