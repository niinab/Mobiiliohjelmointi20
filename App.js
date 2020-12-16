import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import { Ionicons} from '@expo/vector-icons';
import Mainpage from './Mainpage';
import Search from './Search';
import Info from './Info';
import Favorites from './Favorites';
import Map from './Map';
import Playg from './Playg';

function StackNav() {
  const Stack = createStackNavigator();

  return(

    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Info" component={Info} />
    </Stack.Navigator>

  );
}

export default function App() {
  const Tab = createBottomTabNavigator();

  return (

    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Mainpage') {
          iconName = 'md-home-sharp';
        } else if (route.name === 'Search') {
          iconName = 'md-search';
        } else if (route.name === 'Favorites') {
          iconName = 'md-star';
        } else if (route.name === 'Map') {
          iconName = 'md-map';
        } else if (route.name === 'Playg') {
          iconName = 'md-play';
        }

        return <Ionicons name={iconName} size={size} color={color} />
        },
      })}>
        <Tab.Screen name="Home" component={Mainpage} />
        <Tab.Screen name="Search" component={StackNav} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Playg" component={Playg} />
      </Tab.Navigator> 
    </NavigationContainer>
  );
 }
