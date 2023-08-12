import store from '../globalStore';
import { setUser } from './userReducer';
import {getLocalToken} from '../../tools/localToken';
import {clearLocalTokenAndRedirectToLogin} from '../../tools/authTools';
import jwtDecode from 'jwt-decode';
import JwtInterface from '../../tools/jwtInterface';
import usersApi from '../../http/api/users/usersApi';

export async function fetchCurrentUser() {
    const localToken = getLocalToken();
    if (localToken === null) {
        // Functionnaly should never happen
        console.error('FetchCurrentUser was called without a valid local JWT');
        clearLocalTokenAndRedirectToLogin();
        return;
    }

    const decodedJwt = jwtDecode<JwtInterface>(localToken);
    
    
    const userResponse = await usersApi.getUser(decodedJwt.sub);
    if (userResponse.status === 200) {
        store.dispatch(setUser(userResponse.body));
    }
}
