import { publicApiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';

const loginUser = (login: { email: string, password: string}): Promise<ApiResponseBody<{ access_token: string }>> => 
    publicApiCall('auth/login', 'POST', login);

const registerUser = (user: {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}): Promise<ApiResponseBody<{ access_token: string }>> => 
    publicApiCall('auth/register', 'POST', user);

const authApi = {
    loginUser,
    registerUser,
};

export default authApi;
