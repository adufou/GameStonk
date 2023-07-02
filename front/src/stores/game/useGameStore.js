import React, {createContext, useContext, useReducer} from "react";
import gameReducer from "./gameReducer";

export const GameContext = createContext();

export const GameProvider = props => {
    const [state, dispatch] = useReducer(...gameReducer);
    return <GameContext.Provider value={[state, dispatch]} {...props} />;
};

export const useGameStore = () => {
    const [gameStoreState, gameStoreDispatch] = useContext(GameContext);
    
    return {
        state: gameStoreState,
        dispatch: gameStoreDispatch
    };
} ;