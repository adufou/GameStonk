import { addGame, fetchGames, deleteGame } from "./game/gameStoreImpl";

// Reducer and ReducerHandler

const createStoreReducer = (handlers) => (state, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
        return state;
    }
    return handlers[action.type](state, action);
};

const globalStoreReducerHandler = {
    // All functions in XXXStoreImpl

    // Game
    addGame,
    fetchGames,
    deleteGame,
}


// Initial State

const initialState = {
    games: []
};

const globalStoreReducer = [createStoreReducer(globalStoreReducerHandler), initialState];

export default globalStoreReducer;
