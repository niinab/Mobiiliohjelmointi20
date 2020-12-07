import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TextInput} from 'react-native';
import {Card, Button, Header, ListItem } from 'react-native-elements';
import { createStackNavigator} from '@react-navigation/stack';


export default function Search({ navigation }) {

  const Stack = createStackNavigator();


  const [search, setSearch] = useState('');
  const [placeTypes, setPlaceTypes] = useState([]);
  const [sportsPlaceId, setSportPlaceId] = useState([]);
  const [sportPlaces, setSportPlaces] = useState([]);
  

  useEffect(() => {
    getPlaceTypes()
  }, []);
  

  const getSportPlaces = () => {
    fetch(`http://lipas.cc.jyu.fi/api/sports-places/${sportsPlaceId}`)
    .then(response => response.json())
    .then(data =>  {
      console.log('Success', data)
      setSportPlaceId(data)
    })
    .catch((error) => {
         Alert.alert('Something went wrong:', error.message);
    });
  }


  // tai sportsplaceID => osoite näkyviin 
  const getPlaceTypes = () => {
    fetch(`http://lipas.cc.jyu.fi/api/sports-places?searchString=${search}`)
    .then(response => response.json())
    .then(data =>  {
      console.log('Success', data)
      setPlaceTypes(data)
    })
    .catch((error) => {
         Alert.alert('Something went wrong:', error.message);
    });
  }

return (
    <View style={styles.container}>
      <Text>This is search page</Text>

      <View style={styles.listcontainer}>
      <TextInput
      style={{fontSize: 18, width: 230, color:'#ffff'}} value={search}
      placeholder='Etsi sopiva liikuntapaikka' onChangeText={search => setSearch(search)} />
      <Button title='Hae' onPress={getPlaceTypes} />

      <FlatList
      style={{marginLeft: '0%'}}
      keyExtractor={item => item.id}
      // renderItem={({item}) => <Text>{item.name}, {item.description}</Text>}
      renderItem={({ item }) => (

        <Card>
          <Card.Title>{item.sportsPlaceId}</Card.Title>
          <Card.Divider/>
          <Button onClick={getSportPlaces}></Button>
          {/* <Text style={{marginBottom:10, fontSize: 15}}>{item.name}</Text>
          <Text style={{marginBottom:10, fontSize: 14}}>{item.description}</Text> */}
          </Card>
      )}
      data={placeTypes} />
        

    </View>
    </View>
  );
}


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
  