
import Game from '../../../models/Game';
import { apiCall } from '../../../tools/apiCall';
import ApiBodyResponse from '../../../types/ApiBodyResponse';
import ApiStatusResponse from '../../../types/ApiStatusResponse';

const getGames = (): Promise<ApiBodyResponse<Game[]>> => {
    return apiCall('game', 'GET');
};

const getGame = (game: Game): Promise<ApiBodyResponse<Game>> => {
    return apiCall(`game/${game.id}`, 'GET');
};

const addGame = (game: Partial<Game>): Promise<ApiBodyResponse<Game>> => {
    return apiCall('game', 'POST', game);
};

const deleteGame = (game: Game): Promise<ApiStatusResponse> => {
    return apiCall(`game/${game.id}`, 'DELETE');
};

const updateGame = (game: Game): Promise<ApiBodyResponse<Game>> => {
    return apiCall(`game/${game.id}`, 'PUT', game);
};

const gameApi = {
    getGames,
    getGame,
    addGame,
    deleteGame,
    updateGame,
};

export default gameApi;
