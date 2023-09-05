import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../Context/CartContext';

const CartScreen = () => {
  const { state, dispatch } = useCart(); 

  const removeItemFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };
  console.log(state)

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemQuantity}>Miktar: {item.quantity} adet {item.ticketType}</Text>
        <Text style={styles.itemPrice}>Fiyat: {item.price} TL</Text>
      </View>
      <TouchableOpacity
        style={styles.removeItemButton}
        onPress={() => removeItemFromCart(item.id)}
      >
        <Text style={styles.removeItemText}>Kaldır</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sepetim</Text>
      <FlatList
        data={state.cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.total}>Toplam Tutar: {parseFloat(state.totalAmount).toFixed(2)} TL</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#777',
  },
  itemPrice: {
    fontSize: 16,
  },
  removeItemButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 8,
  },
  removeItemText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'right',
  },
});

export default CartScreen;
