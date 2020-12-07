import React from 'react';
import { StyleSheet, View, Button} from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import { Ionicons} from '@expo/vector-icons';
import Mainpage from './Mainpage';
import Search from './Search';
// import Info from './Info';


export default function App() {

  const Tab = createBottomTabNavigator();

  // const Stack = createStackNavigator();

  return (


    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
{/* 
    <Button title="Info" onPress={() => navigation.navigate('Info')} />
      
 //<NavigationContainer>
     <Stack.Navigator>
     <Stack.Screen name="Info" component={Info} />
     </Stack.Navigator> */}
    
     <NavigationContainer>

      <Tab.Navigator 
      screenOptions={({ route }) => ({
      tabBarIcon: ({focused, color, size}) => {
      let iconName;
      if (route.name === 'Mainpage') {
        iconName = 'md-home';
      } else if (route.name === 'Search') {
        iconName = 'md-search';
      }
      return <Ionicons name={iconName} size={size} color={color} />;
        },
        })}>
        <Tab.Screen name="Home" component={Mainpage} />
        <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator> 
      </NavigationContainer>
     
</View>

  );

 }