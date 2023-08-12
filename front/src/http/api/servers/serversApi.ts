import Game from '@/models/Game';
import Server from '@/models/Server';
import { apiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';
import ApiResponseStatus from '@/types/ApiResponseStatus';

const addServer = (server: Partial<Server>): Promise<ApiResponseBody<Server>> => 
    apiCall('servers', 'POST', server);

const deleteServer = (server: Server): Promise<ApiResponseStatus> => 
    apiCall(`servers/${ server.id }`, 'DELETE');

const getServersFromGame = (game: Game): Promise<ApiResponseBody<Server[]>> => 
    apiCall(`servers/game/${ game.id }`, 'GET');

const updateServer = (server: Server): Promise<ApiResponseBody<Server>> => 
    apiCall(`servers/${ server.id }`, 'PATCH', server );

const serversApi = {
    addServer,
    deleteServer,
    getServersFromGame,
    updateServer,
};

export default serversApi;
