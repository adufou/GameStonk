import UserModel from '@/models/user.model';
import { apiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';

const getUser = (id: number): Promise<ApiResponseBody<UserModel>> => apiCall('users/' + String(id), 'GET');

const usersApi = { getUser };

export default usersApi;
