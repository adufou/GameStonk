import Server from 'src/models/Server';
import {apiCall} from '../../../tools/apiCall';

export function useServerApi() {
    return ({
        addServer: (server: Server) => {
            apiCall('server', 'POST', server);
        },
        deleteServer: (server: Server) => {
            apiCall('server/' + server.id, 'DELETE');
        },
        updateServer: (server: Server) => {
            apiCall('server/' + server.id, 'PUT', server );
        },
    });
}
