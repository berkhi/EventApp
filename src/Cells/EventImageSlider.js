import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const EventImageSlider = ({ images }) => {
    return (
      <Swiper style={styles.wrapper}>
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper>
    );
  };

const styles = StyleSheet.create({
    wrapper: {height: 300,},
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 8,
      marginBottom: 16,
    },
  });

export default EventImageSlider;
