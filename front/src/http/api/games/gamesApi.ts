import Game from '@/models/Game';
import { apiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';
import ApiResponseStatus from '@/types/ApiResponseStatus';

const getGames = (): Promise<ApiResponseBody<Game[]>> => apiCall('games', 'GET');

const getGame = (game: Game): Promise<ApiResponseBody<Game>> => apiCall(`games/${ game.id }`, 'GET');

const addGame = (game: Partial<Game>): Promise<ApiResponseBody<Game>> => apiCall('games', 'POST', game);

const deleteGame = (game: Game): Promise<ApiResponseStatus> => apiCall(`games/${ game.id }`, 'DELETE');

const updateGame = (game: Game): Promise<ApiResponseBody<Game>> => apiCall(`games/${ game.id }`, 'PATCH', game);

const gamesApi = {
    getGames,
    getGame,
    addGame,
    deleteGame,
    updateGame,
};

export default gamesApi;
