import { useGameApi } from "../../http/api/game/useGameApi";
import { fetchGames } from "./gameActions";
import { useGameStore } from "./useGameStore";

export function useGameFetch() {
    const gameApi = useGameApi();
    const gameStore = useGameStore();

    const updateGamesInStore = (response) => {
        if (response.status === 200) {
            gameStore.dispatch(fetchGames(response.body))
        }
    }

    return ({
        fetchGames: () => {
            gameApi.getGames(updateGamesInStore)
        }
    })
}