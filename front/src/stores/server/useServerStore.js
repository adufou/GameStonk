import React, {createContext, useContext, useReducer} from "react";
import serverReducer from "./serverReducer";

export const ServerContext = createContext();

export const ServerProvider = props => {
    const [state, dispatch] = useReducer(...serverReducer);
    return <ServerContext.Provider value={[state, dispatch]} {...props} />;
};

export const useServerStore = () => {
    const [serverStoreState, serverStoreDispatch] = useContext(ServerContext);
    
    return {
        state: serverStoreState,
        dispatch: serverStoreDispatch
    };
} ;