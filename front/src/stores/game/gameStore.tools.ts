import gamesApi from '../../http/api/games/gamesApi';
import store from '../globalStore';
import { setGames } from './gamesReducer';

export async function fetchGames() {
    const gamesResponse = await gamesApi.getGames();
    if (gamesResponse.status === 200) {
        store.dispatch(setGames(gamesResponse.body));
    }
}
