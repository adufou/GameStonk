import gameApi from '../../http/api/game/gameApi';
import store from '../globalStore';
import { setGames } from './gamesReducer';

export async function fetchGames() {
    const gamesResponse = await gameApi.getGames();
    if (gamesResponse.status === 200) {
        store.dispatch(setGames(gamesResponse.body));
    }
}