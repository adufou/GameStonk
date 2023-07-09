import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import gamesReducer from './game/gamesReducer';

const store = configureStore({
    reducer: {
        gamesStore: gamesReducer,
    }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
