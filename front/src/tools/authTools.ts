import store from '@/stores/globalStore';
import { setToken } from '@/stores/user/userReducer';
import { fetchCurrentUser } from '@/stores/user/userStore.tools';
import JwtInterface from '@/tools/jwtInterface';
import {
    clearLocalToken, getLocalToken,
} from '@/tools/localToken';
import redirect from '@/tools/redirect';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';

const LOGIN_URI = 'login';
const MIN_EXP_REMAINING_DURATION_IN_MS = 86400000; // 1 day

export const clearLocalTokenAndRedirectToLogin = (): void => {
    store.dispatch(setToken(null));
    clearLocalToken();

    if (window.location.pathname !== `/${ LOGIN_URI }`) {
        redirect(LOGIN_URI);
    }
};

export const authFlowOnStartup = (): void => {
    const localToken = getLocalToken();
    if (localToken === null) {
        clearLocalTokenAndRedirectToLogin();
        return;
    }
    
    try {
        const decodedJwt = jwtDecode<JwtInterface>(localToken);
        
        const now = Date.now();
        const exp = (decodedJwt.exp * 1000);
        
        if (exp - now < MIN_EXP_REMAINING_DURATION_IN_MS) {
            clearLocalTokenAndRedirectToLogin();
        } else {
            fetchCurrentUser().catch(e => console.warn(e));
        }
    } catch (e) {
        if (!(e instanceof InvalidTokenError)) {
            console.warn(e);
        }
        clearLocalTokenAndRedirectToLogin();
    }
    
    store.dispatch(setToken(getLocalToken()));
};
