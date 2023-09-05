import React from 'react';
import MainNavigation from './src/MainNavigation';
import { CartProvider } from './src/Context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <MainNavigation />
    </CartProvider>
  );
};

export default App;