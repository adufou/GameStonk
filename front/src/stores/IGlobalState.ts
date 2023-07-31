import { Reducer } from '@reduxjs/toolkit';
import IGameState from './game/IGameState';
import IUserState from './user/IUserState';

interface IGlobalState {
    gamesStore: Reducer<IGameState>,
    userStore: Reducer<IUserState>,
}

export default IGlobalState;