import User from '@/models/User';
import IUserState from '@/stores/user/IUserState';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUserState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: {
            payload: User
        }) {
            state.user = action.payload;
        },
        setToken(state, action: {
            payload: string | null
        }) {
            state.token = action.payload;
        },
    },
});

export const {
    setUser, setToken, 
} = userSlice.actions;

export default userSlice.reducer;
