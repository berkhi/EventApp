import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EventCell = ({ event }) => {
  return (
    <View style={styles.container}>
      <Image source={event.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.dateSceneContainer}>
          <Text style={styles.dateSceneText}>{event.scene}</Text>
          <Text style={styles.dateSceneText}>{event.date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover', 
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
  dateSceneContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  dateSceneText: {
    fontSize: 14,
    color: 'white',
    marginRight: 20,
  },
});
export default EventCell;