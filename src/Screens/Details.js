import React from 'react';
import { View, Text } from 'react-native';

const DetailsScreen = ({ route }) => {

  const { item } = route.params;

  return (
    <View>
      <Text>Name: {item.name}</Text>
      <Text>Price: {item.unitPrice}</Text>
      <Text>Stock: {item.unitsInStock}</Text>
    </View>
  )
};

export default DetailsScreen;