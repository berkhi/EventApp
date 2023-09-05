import React, { Profiler } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../Screens/CartScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CartScreen" component={CartScreen} options={{ title: 'Cart' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
