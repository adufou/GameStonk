import React, {createContext, useContext, useReducer} from "react";
import { GameReducer } from "./GameReducer";

export const GameContext = createContext();

export const GameProvider = props => {
    const [state, dispatch] = useReducer(...GameReducer);
    return <GameContext.Provider value={[state, dispatch]} {...props} />;
};

export const useGameStore = () => {
    console.log(GameContext)
    console.log(useContext(GameContext))
    const [gameStoreState, gameStoreDispatch] = useContext(GameContext);
    
    console.log(gameStoreState, gameStoreDispatch)

    return {
        state: gameStoreState,
        dispatch: gameStoreDispatch
    };
} ;