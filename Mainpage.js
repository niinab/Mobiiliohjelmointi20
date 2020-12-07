import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TextInput} from 'react-native';
import {Card, Button, Header, ListItem } from 'react-native-elements';


export default function Mainpage({ navigation }) {

    const [placetype, setPlaceType] = useState([]);
    const [info, setInfo] = useState([]);


    useEffect(() => {
        getPlaceTypes()
      }, []);

      const getPlaceTypes = () => {
        fetch(`http://lipas.cc.jyu.fi/api/sports-place-types`)
        .then(response => response.json())
        .then(data => {
          console.log('success', data)
          setPlaceType(data)
        })
        .catch((error) => {
        Alert.alert('something went wrong', error.message)
        });
      }

      
      // const getSelectedPlace = () => {
      //   fetch(`http://lipas.cc.jyu.fi/api/sports-place-types/${typeCode}`)
      //   .then(response => response.json())
      //   .then(data =>  {
      //     console.log('Success', data)
      //     setInfo(data)
      //   })
      //   .catch((error) => {8
      //        Alert.alert('Something went wrong:', error.message);
      //   });
      // }

      // const getInfo = () => {
      //   const typeCode = item.typeCode;
      //   setInfo([...info, {key: item.typeCode}]);
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
      <Text style={{ textAlign: 'center', fontSize: 15, padding: 5, fontWeight: 'bold' }}>This is Mainpage </Text>
            
      <FlatList
      style={{marginLeft: "5%", height: 200}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        
        <Card>
          
          <Card.Title>{item.name}</Card.Title>
          <Card.Divider/>
          <Text style={{marginBottom:10, fontSize: 15}}>{item.name}</Text>
          <Text style={{marginBottom:10, fontSize: 15}}>{item.description}</Text>
          {/* <Button onPress={getPlaceTypes} /> */}
          {/* <Button onPress={()  => navigation.navigate('Info', {info: info})} */}
          {/* title="Lisää tietoa"/> */}
          </Card>       
      )}
      ItemSeparatorComponent={listSeparator} data={placetype} />

    </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },

  listcontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#81C784',
  }, 
})
