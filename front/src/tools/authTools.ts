import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import { QueryClient } from 'react-query';
import usersApi from '@/http/api/users/users.api';
import UserModel from '@/models/user.model';
import JwtInterface from '@/tools/jwtInterface';
import {
    clearLocalToken,
    getLocalToken,
} from '@/tools/localToken';
import redirect from '@/tools/redirect';

const MIN_EXP_REMAINING_DURATION_IN_MS = 86400000; // 1 day

export const fetchCurrentUser = (
    queryClient: QueryClient, 
    callbackFailure?: () => void,
    callbackSuccess?: (user: UserModel) => void): void => {
    const localToken = getLocalToken();
    if (localToken === null) {
        clearLocalToken();
        redirect('login');
        return;
    }
    const decodedJwt = jwtDecode<JwtInterface>(localToken);
    
    usersApi.getUser(decodedJwt.sub)
        .then((userResponse) => {
            queryClient.setQueryData('user', userResponse.body);
            if (callbackSuccess) {
                callbackSuccess(userResponse.body);
            }
        })
        .catch((e) => {
            if (callbackFailure) {
                callbackFailure();
            }
            console.error(e);
        });
};

export const authFlowOnStartup = (
    queryClient: QueryClient,
    callbackFailure: () => void,
    callbackSuccess: () => void,
): void => {
    const localToken = getLocalToken();
    if (localToken === null) {
        clearLocalToken();
        callbackFailure();
        return;
    }

    try {
        const decodedJwt = jwtDecode<JwtInterface>(localToken);
        
        const now = Date.now();
        const exp = (decodedJwt.exp * 1000);
        
        if (exp - now < MIN_EXP_REMAINING_DURATION_IN_MS) {
            clearLocalToken();
            callbackFailure();
        } else {
            fetchCurrentUser(queryClient, callbackFailure, callbackSuccess);
        }
    } catch (e) {
        if (!(e instanceof InvalidTokenError)) {
            console.warn(e);
        }
        clearLocalToken();
        callbackFailure();
    }
};
