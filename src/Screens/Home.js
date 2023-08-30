import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList, Pressable, TextInput, TouchableOpacity, StyleSheet  } from 'react-native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import EventCell from '../Cells/EventCell';

const data = [
  {
    id: '1',
    title: 'Fuji Rock Festival 2020',
    scene: 'Sahne A',
    day: '29',
    month: 'Aug',
    time: '21:00',
    image: require('../images/event1.jpg'),
  },
  {
    id: '2',
    title: 'Ultra Music Festival',
    scene: 'Sahne B',
    day: '29',
    month: 'Aug',
    time: '21:00',
    image: require('../images/event2.jpg'),
  },
];

const HomeScreen = ({ navigation }) => {

    const [filteredData, setFilteredData] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (query) => {
      const filtered = data.filter(item => item.day.includes(query));
      setFilteredData(filtered);
      setSearchQuery(query);
    };
    const renderItem = ({ item }) => (
      <View style={styles.cell}>
        <View style={styles.dateRow}>
          <Text style={styles.dayText}>{item.day}</Text>
          <Text style={styles.dateText}>{item.month}</Text>
        </View>
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
          <FontAwesomeIcon icon={faFilter} style={styles.filterIcon} />
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
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    dateRow: {
      flexDirection: 'column',
      paddingLeft: 16,
      paddingRight: 16,
      alignItems: 'center',
    },
    dayText: {
      marginRight: 12,
      fontWeight: 'bold',
      fontSize: 16,
      color: 'red'
    },
    dateText: {
      marginRight: 12,
      fontWeight: 'bold',
      fontSize: 16,
    },
    filterButton: {
      backgroundColor: '#007bff',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    filterIcon: {
      color: 'white',
      fontSize: 20,
    },
  });
export default HomeScreen;