import { useGameApi } from "../../http/api/game/useGameApi";
import { fetchGames } from "./gameStoreActions";
import { useGlobalStore } from "../useGlobalStore";

export function useGameFetch() {
    // TODO Should not be a composable
    
    const gameApi = useGameApi();
    const store = useGlobalStore();

    const updateGamesInStore = (response) => {
        if (response.status === 200) {
            store.dispatch(fetchGames(response.body))
        }
    }

    return ({
        fetchGames: () => {
            gameApi.getGames(updateGamesInStore)
        }
    })
}