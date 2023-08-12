import gamesApi from '@/http/api/games/gamesApi';
import { setGames } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';

export async function fetchGames(): Promise<void> {
    const gamesResponse = await gamesApi.getGames();
    if (gamesResponse.status === 200) {
        store.dispatch(setGames(gamesResponse.body));
    }
}
