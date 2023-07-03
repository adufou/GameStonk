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
    const gameIndex = state.games.find(g => g === game)

    if (gameIndex !== -1) {
        games.splice(gameIndex, 1);
    }

    return {
        games: games
    }
}