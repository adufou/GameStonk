import { apiCall, publicApiCall } from '../../../tools/apiCall';

export function useAuthApi() {
    return ({
        getUser: (callback) => {
            apiCall('users/auth/user', 'GET', callback, null, 8000);
        },
        loginUser: (data, callback) => {
            publicApiCall('users/auth/login', 'POST', callback, data, 8000);
        },
        logoutUser: (data, callback) => {
            apiCall('users/auth/logout', 'POST', callback, data, 8000);
        },
        registerUser: (data, callback) => {
            publicApiCall('users/auth/register', 'POST', callback, data, 8000);
        }
    });
}
