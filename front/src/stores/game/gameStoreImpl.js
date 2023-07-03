export const addGame = (state, { game }) => {
    return ({
        games: [
            ...state.games,
            {
                ...game,
            },
        ]
    })
}

export const fetchGames = (state, { games }) => ({
    games: games
})

export const deleteGame = (state, { game }) => {
    const games = state.games;
    const gameIndex = state.games.findIndex(g => g.id === game.id)

    console.log(gameIndex)
    if (gameIndex !== -1) {
        games.splice(gameIndex, 1);
    }

    return {
        games: games
    }
}

export const updateGame = (state, { game }) => {
    
    const games = state.games;
    const gameIndex = state.games.findIndex(g => g.id === game.id)

    if (gameIndex !== -1) {
        games[gameIndex] = game;
    }

    return {
        games: games,
    }
}