import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Modal, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import EventImageSlider from '../Cells/EventImageSlider';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { useCart } from '../Context/CartContext'

const EventDetailsScreen = ({ route }) => {
  const { event, allEvents } = route.params;
  const { dispatch } = useCart();
  //console.log('Tıklanan Etkinlik:', event);
  //console.log('Tüm Etkinlikler:', allEvents);
  const [selectedTicketType, setSelectedTicketType] = useState(event.ticketPrices[0].type);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isTicketTypePickerVisible, setIsTicketTypePickerVisible] = useState(false);
  const [isTicketQuantityPickerVisible, setIsTicketQuantityPickerVisible] = useState(false);
  const [showFullEventInfo, setShowFullEventInfo] = useState(false);
  const { navigate } = useNavigation();
  const handleCityClick = (event) => {
    navigate('CityEventsScreen', { event, allEvents });
  };

  const selectedTicketPrice = event.ticketPrices.find(price => price.type === selectedTicketType).price;

  const totalAmount = selectedTicketPrice * ticketQuantity;

  const ticketQuantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);



  const handleAddToCart = () => {
    const newCartItem = {
      id: event.id,
      image: event.image[0],
      title: event.title,
      sceneAndCity: event.sceneAndCity,
      fullDate: event.fullDate,
      time: event.time,
      quantity: ticketQuantity,
      price: selectedTicketPrice,
      ticketType: selectedTicketType,
    };

    dispatch({ type: 'ADD_TO_CART', payload: newCartItem });
    alert(`Sepete ${ticketQuantity} adet ${selectedTicketType} bileti eklendi.`);
  };
  
  const newLatitude = 37.7749;
  const newLongitude = -122.4194;

  return (
    <ScrollView style={styles.container}>
      <EventImageSlider images={event.image} />
      <Text style={styles.title}>{event.title}</Text>

      <TouchableOpacity onPress={() => handleCityClick(event)}>
        <Text style={styles.location}>{event.sceneAndCity}</Text>
      </TouchableOpacity>
      <Text style={styles.dateTime}>{event.fullDate}, {event.time}</Text>

      <Text style={styles.title}>Etkinlik Bilgileri:</Text>
      <Text style={styles.eventInfo}>
        {showFullEventInfo ? event.eventInfo : event.eventInfo.slice(0, 200)}
      </Text>

      {!showFullEventInfo && (
        <TouchableOpacity onPress={() => setShowFullEventInfo(true)}>
          <Text style={styles.readMoreButton}>Daha Fazla</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Bilet Türü:</Text>
      <TouchableOpacity onPress={() => setIsTicketTypePickerVisible(true)}>
        <Text style={styles.dropdownText}>{selectedTicketType}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isTicketTypePickerVisible}
        onRequestClose={() => setIsTicketTypePickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={selectedTicketType}
              onValueChange={(itemValue) => {
                setSelectedTicketType(itemValue);
                setIsTicketTypePickerVisible(false);
              }}
            >
              {event.ticketPrices.map((price, index) => (
                <Picker.Item key={index} label={price.type} value={price.type} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Bilet Adedi:</Text>
      
      <TouchableOpacity onPress={() => setIsTicketQuantityPickerVisible(true)}>
        <Text style={styles.dropdownText}>{ticketQuantity}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isTicketQuantityPickerVisible}
        onRequestClose={() => setIsTicketQuantityPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={ticketQuantity}
              onValueChange={(itemValue) => {
                setTicketQuantity(itemValue);
                setIsTicketQuantityPickerVisible(false);
              }}
            >
              {ticketQuantityOptions.map((quantity, index) => (
                <Picker.Item key={index} label={quantity.toString()} value={quantity} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Toplam Fiyat:</Text>
      <Text style={styles.totalAmount}>{totalAmount} TL</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center', }}>Sepete Ekle</Text>
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: newLatitude,
            longitude: newLongitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: newLatitude,
              longitude: newLongitude,
            }}
            title={event.sceneAndCity}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
  },
  dateTime: {
    fontSize: 16,
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    marginTop: 16,
  },
  eventInfo: {
    fontSize: 16,
    marginTop: 16,
  },
  dropdownText: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: '#007bff',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  mapContainer: {
    marginTop: 16,
    height: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  map: {
    flex: 1,
  },
});

export default EventDetailsScreen;
