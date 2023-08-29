import React, { Profiler } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/Profile';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
