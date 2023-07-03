import { apiCall } from "../../../tools/apiCall"

export function useGameApi() {
    return ({
        getGames: (callback) => {
            apiCall('game', 'GET', callback);
        },
        getGame: (gameId, callback) => {
            apiCall('game/' + gameId, 'GET', callback);
        },
        addGame: (name, callback) => {
            apiCall('game', 'POST', callback, { name });
        },
        deleteGame: (gameId, callback) => {
            apiCall('game/' + gameId, 'DELETE', callback, { gameId });
        }
    })
}