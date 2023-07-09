import User from 'src/models/User';
import { apiCall, publicApiCall } from '../../../tools/apiCall';
import ApiBodyResponse from 'src/types/ApiBodyResponse';
import ApiStatusResponse from 'src/types/ApiStatusResponse';

const getUser = (): Promise<ApiBodyResponse<User>> => {
    return apiCall('users/auth/user', 'GET', null, 8000);
};

const loginUser = (user: Partial<User>): Promise<ApiBodyResponse<{ key: string }>> => {
    return publicApiCall('users/auth/login', 'POST', user, 8000);
};

const logoutUser = (user: User): Promise<ApiStatusResponse> => {
    return apiCall('users/auth/logout', 'POST', user, 8000);
};

const registerUser = (user: Partial<User>): Promise<ApiBodyResponse<{ key: string }>> => {
    return publicApiCall('users/auth/register', 'POST', user, 8000);
};

const authApi = {
    getUser,
    loginUser,
    logoutUser,
    registerUser,
};

export default authApi;
