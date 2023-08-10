
import Game from '../../../models/Game';
import { apiCall } from '../../../tools/apiCall';
import ApiBodyResponse from '../../../types/ApiBodyResponse';
import ApiStatusResponse from '../../../types/ApiStatusResponse';

const getGames = (): Promise<ApiBodyResponse<Game[]>> => {
    return apiCall('games', 'GET');
};

const getGame = (game: Game): Promise<ApiBodyResponse<Game>> => {
    return apiCall(`games/${game.id}`, 'GET');
};

const addGame = (game: Partial<Game>): Promise<ApiBodyResponse<Game>> => {
    return apiCall('games', 'POST', game);
};

const deleteGame = (game: Game): Promise<ApiStatusResponse> => {
    return apiCall(`games/${game.id}`, 'DELETE');
};

const updateGame = (game: Game): Promise<ApiBodyResponse<Game>> => {
    return apiCall(`games/${game.id}`, 'PATCH', game);
};

const gamesApi = {
    getGames,
    getGame,
    addGame,
    deleteGame,
    updateGame,
};

export default gamesApi;
