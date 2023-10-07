import gamesApi from '@/http/api/games/games.api';
import { setGames } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

export async function fetchGames(): Promise<void> {
    const gamesResponse = await gamesApi.getGames();
    if (isCorrectStatusCodeOrNotModified(gamesResponse.status)) {
        store.dispatch(setGames(gamesResponse.body));
    }
}
