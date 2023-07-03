import {apiCall} from "../../../tools/apiCall"

export function useServerApi() {
    return ({
        addServer: (server, callback) => {
            apiCall('server', 'POST', callback, server);
        },
        deleteServer: (server, callback) => {
            apiCall('server/' + server.id, 'DELETE', callback);
        },
        updateServer: (server, callback) => {
            apiCall('server/' + server.id, 'PUT', callback, server );
        },
    })
}