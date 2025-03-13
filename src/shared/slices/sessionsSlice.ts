import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Session {
    id: number;
    time: string;
    date: string;
    movieId: number;
    seatId: number;
    registration: number;
}

const initialState: Session[] = [];

const sessionsSlice = createSlice({
    name: 'sessions',
    initialState,
    reducers: {
        incrementRegistration: (state, action: PayloadAction<number>) => {
            const session = state.find(session => session.id === action.payload);
            if (session) {
                session.registration += 1;
            }
        }
    }
});

export const { incrementRegistration } = sessionsSlice.actions;
export default sessionsSlice.reducer;