import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
    cartItems: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newItem = action.payload;
            const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id && item.ticketType === newItem.ticketType);

            if (existingItemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex].quantity += newItem.quantity;
                const newTotalAmount = state.totalAmount + (newItem.quantity * newItem.price);

                return {
                    ...state,
                    cartItems: updatedCartItems,
                    totalAmount: newTotalAmount,
                };
            } else {
                const newTotalAmount = state.totalAmount + (newItem.quantity * newItem.price);

                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem],
                    totalAmount: newTotalAmount,
                };
            }

        case 'REMOVE_FROM_CART':
            const itemIdToRemove = action.payload;
            const itemToRemove = state.cartItems.find(item => item.id === itemIdToRemove);

            if (!itemToRemove) {
                return state;
            }

            const updatedCartItems = state.cartItems.map(item => {
                if (item.id === itemIdToRemove) {
                    if (item.quantity > 1) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    }
                    return null;
                }
                return item;
            }).filter(Boolean);

            const newTotalAmountAfterRemoval = state.totalAmount - itemToRemove.price;

            return {
                ...state,
                cartItems: updatedCartItems,
                totalAmount: newTotalAmountAfterRemoval,
            };


        default:
            return state;
    }
};


export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart hook must be used within a CartProvider');
    }
    return context;
};
