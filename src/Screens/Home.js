import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import EventCell from '../Cells/EventCell';
import FilterModal from '../Cells/FilterModal';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const categoryOptions = ["Hepsi", "Music", "Spor", "Sahne", "Aile", "Müze"];
const locationOptions = ["Tüm Türkiye", "İstanbul / Marmara", "Ankara / İç Anadolu", "İzmir / Ege", "Antalya / Akdeniz", "Diğer"];

const HomeScreen = ({ navigation }) => {
  const { navigate } = useNavigation();

  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const handleSearch = (query) => {
    const lowercaseQuery = query.toLowerCase();
    
    const filtered = data.filter(item => {
      const lowercaseTitle = item.title.toLowerCase();
      return lowercaseTitle.includes(lowercaseQuery);
    });
  
    setFilteredData(filtered);
    setSearchQuery(query);
  };

  const handleEventPress = (event) => {
    navigate('EventDetailsScreen', { event, allEvents: data });
  };

  const openFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  const applyFilters = (selectedCategory, selectedDate, selectedLocation) => {
    const formattedSelectedDate = format(selectedDate, 'dd/MM/yyyy');

    const filtered = data.filter(item => {
      const isCategoryMatch = item.eventType === selectedCategory || selectedCategory === "Hepsi";
      console.log('CATEGORIES', { eventType: item.eventType, selectedCategory })

      const isDateMatch = item.fullDate === formattedSelectedDate;
      console.log('DATES', { fullDate: item.fullDate, formattedSelectedDate })

      const isLocationMatch = selectedLocation === "Tüm Türkiye" || item.city === selectedLocation;
      console.log('FILTER PARAMETERS', { isCategoryMatch, isDateMatch, isLocationMatch })
      return isCategoryMatch && isDateMatch && isLocationMatch;
    });
    console.log('FILTERED', filtered)
    setFilteredData(filtered);
    console.log('FILTERED DATA', filteredData)
    setIsFilterModalVisible(false);
  };



  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item)}>
      <View style={styles.cell}>
        <View style={styles.dateRow}>
          <Text style={styles.dayText}>{item.day}</Text>
          <Text style={styles.dateText}>{item.month}</Text>
        </View>
        <EventCell event={item} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
          <FontAwesomeIcon icon={faFilter} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FilterModal
        visible={isFilterModalVisible}
        onClose={closeFilterModal}
        categoryOptions={categoryOptions}
        locationOptions={locationOptions}
        applyFilters={applyFilters}
      />
    </View>
  );
};

const data = [
  {
    id: '1',
    title: 'Fuji Rock Festival 2020',
    eventType: 'Music',
    sceneAndCity: 'JJ Pub Ankara',
    city: 'Ankara / İç Anadolu',
    eventInfo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    day: '30',
    month: 'Aug',
    fullDate: '30/08/2023',
    time: '21:00',
    ticketPrices: [
      { type: 'Normal', price: 200 },
      { type: 'VIP', price: 400 },
    ],
    image: [
      require('../images/event1.jpg'),
      require('../images/default-event-image.jpg'),
    ],
  },
  {
    id: '2',
    title: 'Ultra Music Festival',
    eventType: 'Music',
    sceneAndCity: 'JJ Pub Ankara',
    city: 'Ankara / İç Anadolu',
    eventInfo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    day: '29',
    month: 'Aug',
    fullDate: '30/08/2023',
    time: '21:00',
    ticketPrices: [
      { type: 'Normal', price: 200 },
      { type: 'VIP', price: 400 },
    ],
    image: [
      require('../images/event2.jpg'),
      require('../images/default-event-image.jpg'),
    ],
    
  },
  {
    id: '3',
    title: 'Ultra Music Festival',
    eventType: 'Spor',
    sceneAndCity: 'JJ Pub Ankara',
    city: 'Ankara / İç Anadolu',
    eventInfo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    day: '29',
    month: 'Aug',
    fullDate: '30/08/2023',
    time: '21:00',
    ticketPrices: [
      { type: 'Normal', price: 200 },
      { type: 'VIP', price: 400 },
    ],
    image: [
      require('../images/event3.jpg'),
      require('../images/default-event-image.jpg'),
    ],
  },
  {
    id: '4',
    title: 'Courteeners',
    eventType: 'Music',
    sceneAndCity: 'Harbiye Açıkhava İstanbul',
    city: 'İstanbul / Marmara',
    eventInfo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    day: '29',
    month: 'Aug',
    fullDate: '11/09/2023',
    time: '21:00',
    ticketPrices: [
      { type: 'Normal', price: 200 },
      { type: 'VIP', price: 400 },
    ],
    image: [
      require('../images/event4.jpg'),
      require('../images/default-event-image.jpg'),
    ],
  },
  {
    id: '5',
    title: 'Basketball Training',
    eventType: 'Spor',
    sceneAndCity: 'JJ Pub Ankara',
    city: 'Ankara / İç Anadolu',
    eventInfo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    day: '29',
    month: 'Aug',
    fullDate: '13/09/2023',
    time: '21:00',
    ticketPrices: [
      { type: 'Normal', price: 200 },
      { type: 'VIP', price: 400 },
    ],
    image: [
      require('../images/event5.jpg'),
      require('../images/default-event-image.jpg'),
    ],
  },
  {
    id: '6',
    title: 'Sport Action 2020',
    eventType: 'Spor',
    sceneAndCity: 'Tuzla İstanbul',
    city: 'İstanbul / Marmara',
    eventInfo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    day: '29',
    month: 'Sep',
    fullDate: '13/09/2023',
    time: '13:00',
    ticketPrices: [
      { type: 'Normal', price: 200 },
      { type: 'VIP', price: 400 },
    ],
    image: [
      require('../images/event6.jpg'),
      require('../images/default-event-image.jpg'),
    ],
  },
];

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