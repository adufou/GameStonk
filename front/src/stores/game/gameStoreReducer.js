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

const deleteGame = (state, { value }) => {
    const games = state.games;
    const gameIndex = state.games.find(game => game.id === value)

    if (gameIndex !== -1) {
        games.splice(gameIndex, 1);
    }

    return {
        games: games
    }
}

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
    deleteGame,
}

const gameStoreReducer = [createStoreReducer(gameStoreReducerHandler), initialState];

export default gameStoreReducer;
