import Server from 'src/models/Server';
import {apiCall} from '../../../tools/apiCall';
import ApiStatusResponse from 'src/types/ApiStatusResponse';
import ApiBodyResponse from 'src/types/ApiBodyResponse';


const addServer = (server: Partial<Server>): Promise<ApiBodyResponse<Server>> => {
    return apiCall('server', 'POST', server);
};

const deleteServer = (server: Server): Promise<ApiStatusResponse> => {
    return apiCall(`server/${server.id}`, 'DELETE');
};

const updateServer = (server: Server): Promise<ApiBodyResponse<Server>> => {
    return apiCall(`server/${server.id}`, 'PUT', server );
};

const serverApi = {
    addServer,
    deleteServer,
    updateServer,
};

export default serverApi;
