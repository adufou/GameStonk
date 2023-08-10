import User from '../../../models/User';
import { apiCall, publicApiCall } from '../../../tools/apiCall';
import ApiBodyResponse from '../../../types/ApiBodyResponse';
import ApiStatusResponse from '../../../types/ApiStatusResponse';


const getUser = (): Promise<ApiBodyResponse<User>> => {
    return apiCall('users/auth/user', 'GET', null);
};

const loginUser = (user: Partial<User>): Promise<ApiBodyResponse<{ access_token: string }>> => {
    return publicApiCall('auth/login', 'POST', user);
};

const logoutUser = (user: User): Promise<ApiStatusResponse> => {
    return apiCall('auth/logout', 'POST', user);
};

const registerUser = (user: Partial<User>): Promise<ApiBodyResponse<{ access_token: string }>> => {
    return publicApiCall('auth/register', 'POST', user);
};

const authApi = {
    getUser,
    loginUser,
    logoutUser,
    registerUser,
};

export default authApi;
