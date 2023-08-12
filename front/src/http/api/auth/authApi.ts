import User from '@/models/User';
import { publicApiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';

const loginUser = (user: Partial<User>): Promise<ApiResponseBody<{ access_token: string }>> => 
    publicApiCall('auth/login', 'POST', user);

const registerUser = (user: Partial<User>): Promise<ApiResponseBody<{ access_token: string }>> => 
    publicApiCall('auth/register', 'POST', user);

const authApi = {
    loginUser,
    registerUser,
};

export default authApi;
