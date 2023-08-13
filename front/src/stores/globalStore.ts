import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import gamesReducer from '@/stores/game/gamesReducer';
import IGlobalState from '@/stores/IGlobalState';
import userReducer from '@/stores/user/userReducer';

const reducer: IGlobalState = {
    gamesStore: gamesReducer,
    userStore: userReducer,
};

const store = configureStore({ reducer });

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
