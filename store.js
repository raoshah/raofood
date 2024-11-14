import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducer/authSlice';





const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});


store.subscribe(() => {
    console.log('Current state:', store.getState());
});

export default store;
