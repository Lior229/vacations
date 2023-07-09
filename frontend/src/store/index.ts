import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../components/ProductsArea/productsSlice';
import authReducer from '../auth/authSlice';
import vacationsReducer from '../components/Home/vacationsSlice'

const store = configureStore({
    reducer: {
        productsState: productsReducer,
        vacationsState: vacationsReducer,
        authState: authReducer
    }
});


//Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
