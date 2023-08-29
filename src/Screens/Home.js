import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList, Pressable, TextInput, TouchableOpacity, StyleSheet  } from 'react-native';
import axios from 'axios';
import EventCell from '../Cells/EventCell';

const data = [
  {
    id: '1',
    title: 'Fuji Rock Festival 2020',
    scene: 'Sahne A',
    date: 'Aug 29',
    image: require('../images/event1.jpg'),
  },
  {
    id: '2',
    title: 'Etkinlik 2',
    scene: 'Sahne B',
    date: 'Aug 30',
    image: require('../images/event2.jpg'),
  },
];

const HomeScreen = ({ navigation }) => {

    const [filteredData, setFilteredData] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (query) => {
      const filtered = data.filter(item => item.date.includes(query));
      setFilteredData(filtered);
      setSearchQuery(query);
    };
    const renderItem = ({ item }) => (
      <View style={styles.cell}>
        <Text style={styles.dateText}>{item.date}</Text>
        <EventCell event={item} />
      </View>
    );
  
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search dates"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginRight: 8,
    },
    filterButton: {
      backgroundColor: '#007bff',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    filterButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cell: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    dateText: {
      marginRight: 12,
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
export default HomeScreen;