import React, {createContext, useContext, useReducer} from 'react';
import globalStoreReducer from './globalStoreReducer';

export const GlobalContext = createContext();

export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(...globalStoreReducer);
    return <GlobalContext.Provider value={[state, dispatch]} {...props} />;
};

export const useGlobalStore = () => {
    const [globalStoreState, globalStoreDispatch] = useContext(GlobalContext);
    
    return {
        state: globalStoreState,
        dispatch: globalStoreDispatch
    };
} ;
