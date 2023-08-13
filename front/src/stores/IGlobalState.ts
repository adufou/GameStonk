import { Reducer } from '@reduxjs/toolkit';
import IGameState from '@/stores/game/IGameState';
import IUserState from '@/stores/user/IUserState';

interface IGlobalState {
    gamesStore: Reducer<IGameState>,
    userStore: Reducer<IUserState>,
}

export default IGlobalState;
