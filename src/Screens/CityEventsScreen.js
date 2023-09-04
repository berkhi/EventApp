import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import EventCell from '../Cells/EventCell';
import { useNavigation } from '@react-navigation/native';

const CityEventsScreen = ({ route }) => {
    const { event, allEvents } = route.params;
    const filteredEvents = allEvents.filter((item) => item.sceneAndCity === event.sceneAndCity);

    const { navigate } = useNavigation();
    const handleEventPress = (event) => {
        navigate('EventDetailsScreen', { event, allEvents});
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

    // console.log('Received event object:', event);
    // console.log('Tüm Etkinlikler:', allEvents);
    console.log('Filtered Events:', filteredEvents);
    if (!event || event.length === 0) {
        return (
            <View>
                <Text>No events available for this city.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
});

export default CityEventsScreen;
