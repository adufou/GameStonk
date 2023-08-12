import User from '@/models/User';
import { apiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';

const getUser = (id: number): Promise<ApiResponseBody<User>> => apiCall('users/' + String(id), 'GET');

const usersApi = { getUser };

export default usersApi;
