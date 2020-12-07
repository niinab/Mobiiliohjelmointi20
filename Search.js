import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TextInput} from 'react-native';
import {Card, Button, Header, ListItem } from 'react-native-elements';



export default function Search({ navigation }) {

  
  const [search, setSearch] = useState('');
  const [placeTypes, setPlaceTypes] = useState([]);
  const [sportsPlaceId, setSportPlaceId] = useState([]);
  const [sportPlaces, setSportPlaces] = useState([]);
  

  useEffect(() => {
    getPlaceTypes()
  }, []);
  


//miten hausta saisi järkevän, niin että näyttää sportsPlaceId tiedot?
  const getSportPlaces = () => {
    fetch(`http://lipas.cc.jyu.fi/api/sports-places/${item.sportsPlaceId}`)
    .then(response => response.json())
    .then(data =>  {
      console.log('Success', data)
      setSportPlaceId(data)
    })
    .catch((error) => {
         Alert.alert('Something went wrong:', error.message);
    });
  }


// SearchStringillä haettaessa palauttaa vain listan sportsPlaceId:sta, joka ei kerro käyttäjälle mitään
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
      placeholder='Hae liikuntapaikkoja' onChangeText={search => setSearch(search)} />
      <Button title='Hae' onPress={getPlaceTypes} />

      <FlatList
      style={styles.listcontainer}
      keyExtractor={item => item.typeCode}
      // renderItem={({item}) => <Text>{item.name}, {item.description}</Text>}
      renderItem={({ item }) => (

        <Card>
          <Card.Title>{item.sportsPlaceId}</Card.Title>
          <Card.Divider/>
          <Button title="Katso" onClick={getSportPlaces}></Button>
          <Text style={{marginBottom:10, fontSize: 15}}>{item.name}</Text>
          <Text style={{marginBottom:10, fontSize: 14}}>{item.description}</Text>
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
      justifyContent: 'center',
      padding: 5
    },
    
  listcontainer: {
    flex: 1,
    padding: 5,
    backgroundColor: '#81C784',
  },
  });

  