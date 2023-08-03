import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import vacationsReducer from '../components/Home/Vacations/vacationsSlice'
import loaderReducer from '../components/Loader/loaderSlice';

const store = configureStore({
    reducer: {
        vacationsState: vacationsReducer,
        authState: authReducer,
        loaderState: loaderReducer
    }
});


//Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
