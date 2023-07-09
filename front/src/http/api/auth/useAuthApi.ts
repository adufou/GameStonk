import User from 'src/models/User';
import { apiCall, publicApiCall } from '../../../tools/apiCall';

export function useAuthApi() {
    return ({
        getUser: () => {
            apiCall('users/auth/user', 'GET', null, 8000);
        },
        loginUser: (data: User) => {
            publicApiCall('users/auth/login', 'POST', data, 8000);
        },
        logoutUser: (data: User) => {
            apiCall('users/auth/logout', 'POST', data, 8000);
        },
        registerUser: (data: User) => {
            publicApiCall('users/auth/register', 'POST', data, 8000);
        }
    });
}
