import IGameState from '@/stores/game/IGameState';
import IUserState from '@/stores/user/IUserState';
import { Reducer } from '@reduxjs/toolkit';

interface IGlobalState {
    gamesStore: Reducer<IGameState>,
    userStore: Reducer<IUserState>,
}

export default IGlobalState;
