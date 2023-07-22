import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IUserState from "./IUserState";
import User from "../../models/User";
import authApi from "../../http/api/auth/authApi";

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
    }
})

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;