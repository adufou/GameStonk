
export const addServer = (state, { server }) => {
	const gameIndex = state.games.findIndex(g => g.id === server.game);
	const game = state.games[gameIndex];

	game.servers = [
		...(game.servers),
		server,
	];

	const updatedGames = {
		games: state.games
	};
	updatedGames.games.splice(gameIndex, 1, game);

	return({
		...state,
		games: state.games
	});
};


export const deleteServer = (state, { server }) => {
	const gameIndex = state.games.findIndex(g => g.id === server.game);
	const game = state.games[gameIndex];

	const serverIndex = game.servers.findIndex(s => s.id === server.id);
	game.servers.splice(serverIndex, 1);

	const updatedGames = {
		games: state.games
	};
	updatedGames.games.splice(gameIndex, 1, game);

	return({
		...state,
		games: state.games
	});
};

export const updateServer = (state, { server }) => {
	const gameIndex = state.games.findIndex(g => g.id === server.game);
	const game = state.games[gameIndex];

	const serverIndex = game.servers.findIndex(s => s.id === server.id);
	game.servers.splice(serverIndex, 1, server);

	const updatedGames = {
		games: state.games
	};
	updatedGames.games.splice(gameIndex, 1, game);

	return({
		...state,
		games: state.games
	});
};