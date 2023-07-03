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

const createReducer = (handlers) => (state, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
        console.log('ici')
        return state;
    }
    return handlers[action.type](state, action);
};

const gameReducerHandler = {
    addGame,
    fetchGames,
}

const gameReducer = [createReducer(gameReducerHandler), initialState];

export default gameReducer;
