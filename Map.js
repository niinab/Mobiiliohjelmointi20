import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {

  const [address, setAddress] = ('');
  const [region, setRegion] = useState({
  latitude: 60.1582177483368,
  longitude:24.8890372549706,
  latitudeDelta: 0.0322,
  longitudeDelta:0.0221,
  });

  const getCoordinates = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=vUAYoHsmvSA1Eh4ZTAbAHALfK4zQXjA4&location=${address}`)
    .then(response => response.json())
    .then((data) => {
      const lat = data.results[0].locations[0].latLng.lat;
      const lng = data.results[0].locations[0].latLng.lng;
      setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0322,
      longitudeDelta:0.0221,
    });
  }
)}

  return (
    <View style={styles.container}>
      
    <MapView 
      style={{ flex:4}} 
      region={region}>

      <Marker
      coordinate={{
      latitude:region.latitude, 
      longitude: region.longitude}}/>
    </MapView>
      
    <View style={styles.container}>
      <TextInput
      style={{fontSize: 18, height: 40}}
      value={address}
      placeholder="Address"
      onChageText={(address) => setAddress(address)}/>

      <Button title="Show" onPress={getCoordinates} />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

});
