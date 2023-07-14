import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoaderState {
    isLoading: boolean;
}

const loaderState:LoaderState = {
    isLoading:false
}

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: loaderState,
    reducers: {
        startLoading: (state, {payload}: PayloadAction<void>) => {
            state.isLoading = true
        },
        stopLoading: (state, {payload}: PayloadAction<void>) => {
            state.isLoading = false
        }
    }
});

export const { startLoading, stopLoading } = loaderSlice.actions;
export default loaderSlice.reducer;