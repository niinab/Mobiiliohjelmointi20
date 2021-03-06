import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import {Card, Button, Input} from 'react-native-elements';
import * as firebase from 'firebase';

export default function Search({ navigation }) {

  // const firebaseConfig = {
  //   apiKey: "AIzaSyAy5tC8AFjHo4XAkS_KbiMY1mofpUBqdXQ",
  //   authDomain: "sportapp-11886.firebaseapp.com",
  //   databaseURL: "https://sportapp-11886-default-rtdb.firebaseio.com",
  //   projectId: "sportapp-11886",
  //   storageBucket: "sportapp-11886.appspot.com",
  //   messagingSenderId: "362861173914",
  //   appId: "1:362861173914:web:9c4e22cfc83e43b258d323"
  // };

  // firebase.initializeApp(firebaseConfig);
  // // firebase.database().ref('favorites/')

  const [search, setSearch] = useState('');
  const [searchtwo, setSearchTwo] = useState('');
  const [placeTypes, setPlaceTypes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
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
         Alert.alert('Something went wrong', error.message);
    });
  }

    // useEffect(() => {
  //   firebase.database().ref('favorites/').on('value', snapshot => {
  //     const data = snapshot.val();
  //     const favs = Object.values(data);
  //     setFavorites(favs);
  //   });
  // },[]);

    // const saveFavorites = () => {
  //   firebase.database().ref('favorites/').push(
  //     {'placetypes': placeTypes}
  //   );
  // }

  const listSeparator = () => {
    return (
        <View style={{
            height: 1,
            width: "90%",
            backgroundColor: "#CED0CE",
            marginLeft: "10%"
        }}/>
      )}

return (
    <View style={styles.container}>

      <View style={styles.listcontainer}>
      <Input
      style={{fontSize: 18, width: 230, color:'#050706'}} value={search}
      placeholder='Sport type' onChangeText={search => setSearch(search)} />
      <Input
      style={{fontSize: 18, width: 230, color:'#050706'}} value={searchtwo}
      placeholder='City' onChangeText={searchtwo => setSearchTwo(searchtwo)} />
      <Button title='Show results' onPress={getPlaceTypes} />

      <FlatList
      style={{marginLeft: "5%", height: 200}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (

      <Card>
          <Card.Title>{item.name}</Card.Title>
      <Card.Divider/>
      <Text style={{marginBottom:10, fontSize: 15}}>{item.location.address}, {item.location.city.name}</Text>
      <Text style={{ marginBottom: 10, color: '#130DDE' }} onPress={() => { Linking.openURL(item.wwww) }}>Visit website</Text>
      <Button onPress={() => navigation.navigate('Info', {longitude: item.location.coordinates.wgs84.lon}, 
      {latitude: item.location.coordinates.wgs84.lat})}
      title="Show location"/>
     {/* <Button onPress={saveFavorites} title="Save as Favorite"/> */}
    </Card>)}
    ItemSeparatorComponent={listSeparator} data={placeTypes} />
    </View>
</View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#49514E',
      justifyContent: 'center',
      padding: 5
    },
    
    listcontainer: {
      flex: 1,
      padding: 5,
      backgroundColor: '#7BDCB5',
  },
});

  