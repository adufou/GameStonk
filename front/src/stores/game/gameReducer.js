const initialState = {};

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

const createReducer = (handlers) => (state, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
        return state;
    }
    return handlers[action.type](state, action);
};

// const counterReducerHandler = {
//     increment, decrement
// }

export const GameReducer = [createReducer(), initialState];
