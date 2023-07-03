import { useGameApi } from "../../http/api/game/useGameApi";
import { fetchGames } from "./gameActions";
import { useGameStore } from "./useGameStore";

export function useGameFetch() {
    const gameApi = useGameApi();
    const gameStore = useGameStore();

    const updateGamesInStore = (data) => {
        gameStore.dispatch(fetchGames(data))
    }

    return ({
        fetchGames: () => {
            gameApi.getGames(updateGamesInStore)
        }
    })
}