import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import EventDetailsScreen from '../Screens/EventDetailsScreen';
import CityEventsScreen from '../Screens/CityEventsScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Events' }} />
      <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} options={{ title: 'Details' }} />
      <Stack.Screen name="CityEventsScreen" component={CityEventsScreen} options={{ title: 'Events In Your City' }}/>
    </Stack.Navigator>
    
  );
};

export default StackNavigator;
