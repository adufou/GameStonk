import User from '../../../models/User';
import { apiCall, publicApiCall } from '../../../tools/apiCall';
import ApiBodyResponse from '../../../types/ApiBodyResponse';
import ApiStatusResponse from '../../../types/ApiStatusResponse';

const loginUser = (user: Partial<User>): Promise<ApiBodyResponse<{ access_token: string }>> => {
    return publicApiCall('auth/login', 'POST', user);
};

const registerUser = (user: Partial<User>): Promise<ApiBodyResponse<{ access_token: string }>> => {
    return publicApiCall('auth/register', 'POST', user);
};

const authApi = {
    loginUser,
    registerUser,
};

export default authApi;
