import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [], 
    totalItems: 0, 
    totalPrice: 0, 
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(cartItem => cartItem._id === item._id);

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice += parseFloat(item.price);
            } else {
                state.cartItems.push({
                    ...item,
                    quantity: 1,
                    totalPrice: parseFloat(item.price),
                });
            }

            state.totalItems += 1;
            state.totalPrice += parseFloat(item.price);
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const item = state.cartItems.find(cartItem => cartItem._id === itemId);

            if (item) {
                state.totalItems -= item.quantity;
                state.totalPrice -= item.totalPrice;

                state.cartItems = state.cartItems.filter(cartItem => cartItem._id !== itemId);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
