import apiCall from "../../../tools/apiCall"

export function useGameApi() {
    return ({
        getGames: (callback) => {
            apiCall('game/', 'GET', callback);
        },
    })
}
