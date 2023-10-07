import jwtDecode from 'jwt-decode';
import usersApi from '@/http/api/users/users.api';
import store from '@/stores/globalStore';
import { setUser } from '@/stores/user/userReducer';
import { clearLocalTokenAndRedirectToLogin } from '@/tools/authTools';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';
import JwtInterface from '@/tools/jwtInterface';
import { getLocalToken } from '@/tools/localToken';

export async function fetchCurrentUser(): Promise<void> {
    const localToken = getLocalToken();
    if (localToken === null) {
        // Functionnaly should never happen
        console.error('FetchCurrentUser was called without a valid local JWT');
        clearLocalTokenAndRedirectToLogin();
        return;
    }

    const decodedJwt = jwtDecode<JwtInterface>(localToken);
    
    const userResponse = await usersApi.getUser(decodedJwt.sub);
    if (isCorrectStatusCodeOrNotModified(userResponse.status)) {
        store.dispatch(setUser(userResponse.body));
    }
}
