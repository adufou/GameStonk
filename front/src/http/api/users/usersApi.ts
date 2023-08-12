import User from '../../../models/User';
import {apiCall} from '@/tools/apiCall';
import ApiBodyResponse from '../../../types/ApiBodyResponse';

const getUser = (id: number): Promise<ApiBodyResponse<User>> => {
    return apiCall('users/' + id, 'GET');
};

const usersApi = {
    getUser,
};

export default usersApi;
