import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TextInput} from 'react-native';
import { Card, Button, Header, ListItem, } from 'react-native-elements';
import {MapView, Marker} from 'react-native-maps';

export default function Playground({ navigation }) {

    const [placetype, setPlaceType] = useState([]);
    const [region, setRegion] = useState({
      latitude: 60.200692,
    longitude:24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta:0.0221,
    });
    const [location, setLocation] = useState([]);
    const [info, setInfo] = useState([]);
    const [typeCode, setTypeCode] = useState([]);

    useEffect(() => {
      getPlaceTypes()
    }, []);

    // useEffect(() => {
    //   getLocation()
    // }, []);


    const getPlaceTypes = () => {
        fetch(`http://lipas.cc.jyu.fi/api/sports-places?fields=type.name&fields=location.sportsPlaces&fields=www&fields=location.coordinates.wgs84&fields=location.address`)
        .then(response => response.json())
        .then(data => {
          console.log('success', data)
          setPlaceType(data)
        })
        .catch((error) => {
        Alert.alert('something went wrong', error.message)
      });
    }

    const getLocation = () => {
      fetch(`http://lipas.cc.jyu.fi/api/sports-places?fields=location.coordinates.wgs84`)
      .then(response => response.json())
      .then((data) => {
        const lat = data[0].location.coordinates.wgs84.lat;
        const lng = data[0].location.coordinates.wgs84.lon;
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        })
    })
  }
    
    //   //Miten sport-place-types itemin typeCoden saa lähetettyä eteenpäin, niin että Info sivulle aukeaa sen itemin tiedot? 
    //   const getSelectedPlace = () => {
    //     fetch(`http://lipas.cc.jyu.fi/api/sports-place-types/${item.typeCode}`)
    //     .then(response => response.json())
    //     .then(data =>  {
    //       console.log('Success', data)
    //       setInfo(data)
    //     })
    //     .catch((error) => {
    //          Alert.alert('Something went wrong:', error.message);
    //     });
    //   }


    // function getData() {
    //     let categories = fetch('http://lipas.cc.jyu.fi/api/categories?lang=fi');
    //     let sportplace = fetch('http://lipas.cc.jyu.fi/api/sports-places/${sports-place-id}');

    //     Promise.all([categories, sportplace])
    //     .then(values => Promise.all(values.map(value => value.json())))
    //     .then(finalVals => {
    //         let categoryResp = finalVals[0];
    //         let sportplaceResp = finalVals[1];
    //     })
    // }

      const listSeparator = () => {
        return (
            <View style={{
                height: 1,
                width: "90%",
                backgroundColor: "#CED0CE",
                marginLeft: "5%"
            }}
            />
        )}

  return (
    <View style={styles.container}>
      <View style={styles.listcontainer}>
      <Text style={{ textAlign: 'center', fontSize: 15, padding: 5, fontWeight: 'bold' }}>This is Playground </Text>
            
      <FlatList
      style={{marginLeft: "5%", height: 200}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        
        <Card>
          <Card.Title>{item.type.name}</Card.Title>
          <Card.Divider/>
          <Text style={{marginBottom:10, fontSize: 15}}>{item.location.coordinates.wgs84.lon}</Text>
          <Text style={{marginBottom:10, fontSize: 15}}>{item.location.coordinates.wgs84.lat}</Text>
          <Text style={{marginBottom:10, fontSize: 15}}>{item.location.address}</Text>
          <Text style={{ marginBottom: 10, color: '#130DDE' }} onPress={() => { Linking.openURL(item.wwww) }}>Tästä nettisivuille</Text>
          <Button title="Show" onPress={getLocation} />
          
           {/* typeCode itselle tiedoksi toistaiseksi*/}
          {/* <Text style={{marginBottom: 10, fontSize: 15}}>{item.typeCode}</Text>
          <Button onPress={()  => navigation.navigate('Info', {name: item.name})}
           title="Lisää tietoa"/> */}

          </Card>
      )}
      ItemSeparatorComponent={listSeparator} data={placetype} />

    </View>
{/* 
    <MapView
          style={styles.map}
          region={region}>
          <Marker
            coordinate={{latitude:region.latitude, longitude:region.longitude}} />
        </MapView> */}
      <View style={styles.mapcontainer} >
        <MapView
          style={styles.map}
          region={{
            latitude: 60.167389,
            longitude: 24.931080,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }}
          onRegionChange={setRegion}>

          <Marker
            coordinate={{
              latitude: 60.167389,
              longitude: 24.931080
            }}
            title='Kamppi' />
        </MapView>
      </View>
      </View>
  );
}


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
  mapcontainer: {
    flex: 1,
    padding: 10,
  },
  map: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});