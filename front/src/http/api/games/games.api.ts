import GameModel from '@/models/game.model';
import { apiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';
import ApiResponseStatus from '@/types/ApiResponseStatus';

const addGame = (game: Partial<GameModel>): Promise<ApiResponseBody<GameModel>> =>
    apiCall('games', 'POST', game);

const deleteGame = (game: GameModel): Promise<ApiResponseStatus> => 
    apiCall(`games/${ game.id }`, 'DELETE');

const getGame = (id: GameModel['id']): Promise<ApiResponseBody<GameModel>> =>
    apiCall(`games/${ id }`, 'GET');

const getGames = (): Promise<ApiResponseBody<GameModel[]>> => 
    apiCall('games', 'GET');

const updateGame = (game: GameModel): Promise<ApiResponseBody<GameModel>> => 
    apiCall(`games/${ game.id }`, 'PATCH', game);

const gamesApi = {
    addGame,
    deleteGame,
    getGame,
    getGames,
    updateGame,
};

export default gamesApi;
