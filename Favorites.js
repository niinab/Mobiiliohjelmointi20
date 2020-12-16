import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TextInput} from 'react-native';
import {Card, Button, Header, ListItem } from 'react-native-elements';


export default function Favorites({ route, navigation }) {

    const [favorite, setFavorite] = useState([]);
    const [placetypes, setPlaceTypes] = useState([]);

    useEffect(() => {
        getPlaceTypes()
      }, []);

    const getPlaceTypes = () => {
      fetch(`http://lipas.cc.jyu.fi/api/sports-places?fields=www&fields=name&fields=location.city.name&fields=location.coordinates.wgs84&fields=location.address&searchString=${search}%20${searchtwo}`)
      .then(response => response.json())
      .then(data =>  {
        console.log('Success', data)
        setPlaceTypes(data)
      })
      .catch((error) => {
           Alert.alert('Something went wrong:', error.message);
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
      <Text style={{ textAlign: 'center', fontSize: 15, padding: 5, fontWeight: 'bold' }}>Your Favorites </Text>

      <FlatList
        style={{marginLeft: "5%", height: 200}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
        
        <Card>
          <Card.Title>{route.params.name}</Card.Title>
            <Card.Divider/>
              <Text style={{marginBottom:10, fontSize: 15}}>{route.params.address}</Text>
              <Text style={{marginBottom:10, fontSize: 15}}>{route.params.city}</Text> 
        </Card>
      )}
      ItemSeparatorComponent={listSeparator} data={placetypes}/>
      
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