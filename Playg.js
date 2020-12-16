import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TextInput} from 'react-native';
import {Card, Button, Header, ListItem } from 'react-native-elements';


export default function Playg({ route, navigation }) {

    const [mytrain, SetMyTrain] = useState('');
    const [duration, setDuration] = useState('');
    const [data, setData] = useState([]);


    const addTrain = () => {
        setData([...data, {key: mytrain}]);
        SetMyTrain('');
        Alert.alert('Good job, training saved!')
    }



return (
    <View style={styles.container}>
      <View style={styles.listcontainer}>
        <TextInput 
            style={styles.textcontainer} 
            placeholder="Training"
            onChangeText={mytrain => SetMyTrain(mytrain)}
            value={mytrain}/>
        <Button onPress={addTrain} title="Save training" />
        

     <View>
        <FlatList
        data={data}
        style={{ marginLeft: "0%", height: 150 }}
        renderItem={({item}) =>
    <Text>{item.key}</Text>}/>
    </View>
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
        flex: 3,
        padding: 5,
        backgroundColor: '#7BDCB5',
      },
      textcontainer: {
        width: 200,
        textAlign: 'center', 
        fontSize: 18, 
        padding: 5, 
        fontWeight: 'bold'
      }
});