import { createSlice } from '@reduxjs/toolkit';
import UserModel from '@/models/user.model';
import IUserState from '@/stores/user/IUserState';

const initialState: IUserState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: {
            payload: UserModel
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
