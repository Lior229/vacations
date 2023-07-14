import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Vacation from '../../models/Vacation'
import User from '../../models/User';

interface VacationState {
    vacations: Vacation[],
    vacation?: Vacation
}

const initialState: VacationState = {
    vacations: []
}

export const vacationSlice = createSlice({
    name: 'vacations',
    initialState: initialState,
    reducers: {
        setVacations: (state, { payload: vacation }: PayloadAction<Vacation[]>) => {
            state.vacations = vacation;
        },
        setVacation: (state, action: PayloadAction<Vacation>) => {
            const { payload } = action; 
            state.vacation = payload;
        },
        addVacation: (state, { payload: vacation }: PayloadAction<Vacation>) => {
            state.vacations.push(vacation);
        },
        updateVacation: (state, { payload: vacation }: PayloadAction<Vacation>) => {
            const indexToUpdate = state.vacations.findIndex((v) => v.vacationCode === vacation.vacationCode);
            if (indexToUpdate >= 0) {state.vacations[indexToUpdate] = vacation}
            state.vacation = vacation;
        },
        deleteVacation: (state, { payload: vacationCode }: PayloadAction<number>) => {
            const indexToDelete = state.vacations.findIndex((v) => v.vacationCode === vacationCode);
            if (indexToDelete >= 0) {state.vacations.splice(indexToDelete, 1)}
        },
        addFollower: (state, { payload: vacation }: PayloadAction<Vacation>) => {
            state.vacation!.numberOfFollowers++
        },
        removeFollower: (state, { payload: vacation }: PayloadAction<Vacation>) => {
            state.vacation!.numberOfFollowers--
        }
    }
});

export const { setVacations, addVacation, updateVacation, deleteVacation, setVacation, addFollower, removeFollower} = vacationSlice.actions;
export default vacationSlice.reducer;