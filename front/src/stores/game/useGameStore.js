import React, {createContext, useContext, useReducer} from "react";
import gameStoreReducer from "./gameStoreReducer";

export const GameContext = createContext();

export const GameProvider = props => {
    const [state, dispatch] = useReducer(...gameStoreReducer);
    return <GameContext.Provider value={[state, dispatch]} {...props} />;
};

export const useGameStore = () => {
    const [gameStoreState, gameStoreDispatch] = useContext(GameContext);
    
    return {
        state: gameStoreState,
        dispatch: gameStoreDispatch
    };
} ;