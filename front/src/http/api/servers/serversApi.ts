
import Server from '../../../models/Server';
import {apiCall} from '../../../tools/apiCall';
import ApiBodyResponse from '../../../types/ApiBodyResponse';
import ApiStatusResponse from '../../../types/ApiStatusResponse';
import Game from '../../../models/Game';


const addServer = (server: Partial<Server>): Promise<ApiBodyResponse<Server>> => {
    return apiCall('servers', 'POST', server);
};

const deleteServer = (server: Server): Promise<ApiStatusResponse> => {
    return apiCall(`servers/${server.id}`, 'DELETE');
};

const getServersFromGame = (game: Game): Promise<ApiBodyResponse<Server[]>> => {
    return apiCall(`servers/game/${game.id}`, 'GET');
};

const updateServer = (server: Server): Promise<ApiBodyResponse<Server>> => {
    return apiCall(`servers/${server.id}`, 'PATCH', server );
};

const serversApi = {
    addServer,
    deleteServer,
    getServersFromGame,
    updateServer,
};

export default serversApi;
