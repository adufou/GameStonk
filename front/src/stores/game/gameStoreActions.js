export const addGame = game => ({type: 'addGame', game});

export const fetchGames = games => ({type: 'fetchGames', games});

export const deleteGame = game => ({type: 'deleteGame', game});

export const updateGame = game => ({type: 'updateGame', game});
