const initialState = {
    games: []
};

const addGame = (state, { value }) => ({
    games: [
        ...state.games,
        {
            name: value,
        },
    ]
})

const fetchGames = (state, { value }) => ({
    games: value
})

const createStoreReducer = (handlers) => (state, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
        console.log('ici')
        return state;
    }
    return handlers[action.type](state, action);
};

const gameStoreReducerHandler = {
    addGame,
    fetchGames,
}

const gameStoreReducer = [createStoreReducer(gameStoreReducerHandler), initialState];

export default gameStoreReducer;
