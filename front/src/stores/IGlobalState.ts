import { Reducer } from '@reduxjs/toolkit';
import IUserState from '@/stores/user/IUserState';

interface IGlobalState {
    userStore: Reducer<IUserState>,
}

export default IGlobalState;
