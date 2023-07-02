import { useGameApi } from "../../http/api/game/useGameApi";
import { fetchGames } from "./gameActions";
import { useGameStore } from "./useGameStore";

export function useGameFetch() {
    const gameApi = useGameApi();
    const gameStore = useGameStore();

    return ({
        fetchAllGames: () => {
            gameApi.getGames((data) => {
                gameStore.dispatch(fetchGames(data))
            })
        }
    })
}