import GameModel from '@/models/game.model';
import ServerModel from '@/models/server.model';
import { apiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';
import ApiResponseStatus from '@/types/ApiResponseStatus';

const addServer = (server: Partial<ServerModel>): Promise<ApiResponseBody<ServerModel>> => 
    apiCall('servers', 'POST', server);

const deleteServer = (server: ServerModel): Promise<ApiResponseStatus> => 
    apiCall(`servers/${ server.id }`, 'DELETE');

const getServersFromGame = (game: GameModel): Promise<ApiResponseBody<ServerModel[]>> => 
    apiCall(`servers/game/${ game.id }`, 'GET');

const updateServer = (server: ServerModel): Promise<ApiResponseBody<ServerModel>> => 
    apiCall(`servers/${ server.id }`, 'PATCH', server );

const serversApi = {
    addServer,
    deleteServer,
    getServersFromGame,
    updateServer,
};

export default serversApi;
