import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTH_LOGIN_SESSION_STORAGE_KEY } from '../config';
import User from '../models/User';
import { handleToken, setInitialAuthState } from './utils';
import { stat } from 'fs';


export interface AuthState {
    user: User | null;
    token: string | null;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: setInitialAuthState(),
    reducers: {
        register: (state, { payload: token }: PayloadAction<string>) => {
            handleToken(state, token);
        },
        login: (state, { payload: token }: PayloadAction<string>) => {
            handleToken(state, token);
        },
        addFollowing: (state, { payload: vacationCode }: PayloadAction<number>) =>{
            state.user!.likedVacations[vacationCode]=true
        },
        removeFollowing: (state, { payload: vacationCode }: PayloadAction<number>) =>{
            state.user!.likedVacations[vacationCode]=false
        },
        logout: (state) => {
            state.token = null;
            state.user = null
            sessionStorage.removeItem(AUTH_LOGIN_SESSION_STORAGE_KEY);
        },
    }
});


export const { register, login, addFollowing, removeFollowing, logout } = authSlice.actions;
export default authSlice.reducer;