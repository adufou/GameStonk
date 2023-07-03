import { apiCall } from "../../../tools/apiCall"

export function useGameApi() {
    return ({
        getGames: (callback) => {
            apiCall('game', 'GET', callback);
        },
        getGame: (game, callback) => {
            apiCall('game/' + game.id, 'GET', callback);
        },
        addGame: (game, callback) => {
            apiCall('game', 'POST', callback, game);
        },
        deleteGame: (game, callback) => {
            apiCall('game/' + game.id, 'DELETE', callback);
        },
        updateGame: (game, callback) => {
            apiCall('game/' + game.id, 'PUT', callback, game);
        },
    })
}