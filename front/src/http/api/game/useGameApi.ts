import Game from 'src/models/Game';
import { apiCall } from '../../../tools/apiCall';

export function useGameApi() {
    return ({
        getGames: () => {
            return apiCall('game', 'GET');
        },
        getGame: (game: Game) => {
            return apiCall('game/' + game.id, 'GET');
        },
        addGame: (game: Game) => {
            return apiCall('game', 'POST', game);
        },
        deleteGame: (game: Game) => {
            return apiCall('game/' + game.id, 'DELETE');
        },
        updateGame: (game: Game) => {
            return apiCall('game/' + game.id, 'PUT', game);
        },
    });
}
