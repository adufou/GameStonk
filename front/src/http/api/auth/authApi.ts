import User from '../../../models/User';
import { apiCall, publicApiCall } from '../../../tools/apiCall';
import ApiBodyResponse from '../../../types/ApiBodyResponse';
import ApiStatusResponse from '../../../types/ApiStatusResponse';


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
