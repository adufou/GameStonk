import React, {createContext, createElement, useContext, useReducer} from 'react';
import globalStoreReducer from './globalStoreReducer';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }): JSX.Element => {
    const [state, dispatch] = useReducer(...globalStoreReducer);

    const element = createElement('GlobalContext.Provider', { value: [state, dispatch], }, children)
    return <GlobalContext.Provider value={[state, dispatch]} {...props} />;
};

export const useGlobalStore = () => {
    const [globalStoreState, globalStoreDispatch] = useContext(GlobalContext);
    
    return {
        state: globalStoreState,
        dispatch: globalStoreDispatch
    };
} ;
