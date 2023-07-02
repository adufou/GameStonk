const initialState = {
    games: []
};

// function counterReducer(state, action) {
//     switch (action.type) {
//         case 'increment':
//             return {count: state.count + action.value};
//         case 'decrement':
//             return {count: state.count - action.value};
//         default:
//             throw new Error();
//     }
// }

// const increment = (state, { value }) => ({
//     count: state.count + value
// });

// const decrement = (state, { value }) => ({
//     count: state.count - value
// });

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
