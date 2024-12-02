import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducer/authSlice';
import productSlice from './reducer/productSlice'
import cartSlice from './reducer/cartSlice'





const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice,
        cart: cartSlice,
    },
});


store.subscribe(() => {
    console.log('Current state:', store.getState());
});

export default store;
