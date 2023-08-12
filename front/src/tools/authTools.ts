import store from '../stores/globalStore';
import {setToken} from '../stores/user/userReducer';
import {clearLocalToken, getLocalToken} from './localToken';
import redirect from './redirect';
import jwtDecode, {InvalidTokenError} from 'jwt-decode';
import JwtInterface from './jwtInterface';
import {fetchCurrentUser} from '../stores/user/userStore.tools';

const LOGIN_URI = 'login';
const MIN_EXP_REMAINING_DURATION_IN_MS = 86400000; // 1 day

export const clearLocalTokenAndRedirectToLogin = () => {
    store.dispatch(setToken(null));
    clearLocalToken();

    if (window.location.pathname !== `/${LOGIN_URI}`) {
        redirect(LOGIN_URI);
    }
};

export const authFlowOnStartup = () => {
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
            fetchCurrentUser();
        }
    } catch (e) {
        if (!(e instanceof InvalidTokenError)) {
            console.warn(e);
        }
        clearLocalTokenAndRedirectToLogin();
    }
    
    store.dispatch(setToken(getLocalToken()));
};
