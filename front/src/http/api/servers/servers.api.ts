import GameModel from '@/models/game.model';
import ServerModel from '@/models/server.model';
import { apiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';
import ApiResponseStatus from '@/types/ApiResponseStatus';

const addServer = (server: Partial<ServerModel>): Promise<ApiResponseBody<ServerModel>> => 
    apiCall('servers', 'POST', server);

const deleteServer = (server: ServerModel): Promise<ApiResponseStatus> => 
    apiCall(`servers/${ server.id }`, 'DELETE');

const getServer = (id: ServerModel['id']): Promise<ApiResponseBody<ServerModel>> =>
    apiCall(`servers/${ id }`, 'GET');

const getServersFromGame = (gameId: GameModel['id']): Promise<ApiResponseBody<ServerModel[]>> => 
    apiCall(`servers/game/${ gameId }`, 'GET');
    
const updateServer = (server: ServerModel): Promise<ApiResponseBody<ServerModel>> => 
    apiCall(`servers/${ server.id }`, 'PATCH', server );

const serversApi = {
    addServer,
    deleteServer,
    getServer,
    getServersFromGame,
    updateServer,
};

export default serversApi;
