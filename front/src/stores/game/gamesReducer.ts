import { createSlice } from '@reduxjs/toolkit';
import GameModel from '@/models/game.model';
import MarketplaceModel from '@/models/marketplace.model';
import ServerModel from '@/models/server.model';
import IGameState from '@/stores/game/IGameState';

const initialState: IGameState = { games: [] };

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        addGame(state: IGameState, action: {
            payload: GameModel
        }) {
            state.games.push(action.payload);
        },
        setGames(state: IGameState, action: {
            payload: GameModel[]
        }) {
            state.games = action.payload;
        },
        deleteGame(state: IGameState, action: {
            payload: GameModel
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.id);
        
            if (gameIndex !== -1) {
                state.games.splice(gameIndex, 1);
            }
        },
        updateGame(state: IGameState, action: {
            payload: GameModel
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.id);
        
            if (gameIndex !== -1) {
                state.games[ gameIndex ] = action.payload;
            }
        },
        addServer(state: IGameState, action: {
            payload: ServerModel
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.game);
            
            if(!state.games[ gameIndex ].servers) {
                state.games[ gameIndex ].servers = [];
            }
            state.games[ gameIndex ].servers.push(action.payload);
        },
        deleteServer(state: IGameState, action: {
            payload: ServerModel
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.game);        
            const serverIndex = state.games[ gameIndex ].servers.findIndex(s => s.id === action.payload.id);
            state.games[ gameIndex ].servers.splice(serverIndex, 1);
        },
        updateServer(state: IGameState, action: {
            payload: ServerModel
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.game);        
            const serverIndex = state.games[ gameIndex ].servers.findIndex(s => s.id === action.payload.id);
            state.games[ gameIndex ].servers.splice(serverIndex, 1, action.payload);
        },
        addMarketplace(state: IGameState, action: {
            payload: MarketplaceModel
        }) {
            const gameIndex = state.games.findIndex(g => 
                g.servers.some(s => s.id === (action.payload.server ?? action.payload.serverId)),
            );
            if (gameIndex === -1) {
                return;
            }
            
            const serverIndex = state.games[ gameIndex ].servers
                .findIndex(s => s.id === (action.payload.server ?? action.payload.serverId));
            if (serverIndex === -1) {
                return;
            }
            
            if(!state.games[ gameIndex ].servers[ serverIndex ].marketplaces) {
                state.games[ gameIndex ].servers[ serverIndex ].marketplaces = [];
            }
            state.games[ gameIndex ].servers[ serverIndex ].marketplaces.push(action.payload);
        },
        deleteMarketplace(state: IGameState, action: {
            payload: MarketplaceModel
        }) {
            const gameIndex = state.games.findIndex(g =>
                g.servers.some(s => s.id === action.payload.server),
            );
            if (gameIndex === -1) {
                return;
            }
            
            const serverIndex = state.games[ gameIndex ].servers.findIndex(s => s.id === action.payload.server);
            if (serverIndex === -1) {
                return;
            }
            
            const marketplaceIndex = state.games[ gameIndex ].servers[ serverIndex ].marketplaces
                .findIndex(m => m.id === action.payload.id);
            if (marketplaceIndex === -1) {
                return;
            }
            
            state.games[ gameIndex ].servers[ serverIndex ].marketplaces.splice(marketplaceIndex, 1);
        },
        updateMarketplace(state: IGameState, action: {
            payload: MarketplaceModel
        }) {
            const gameIndex = state.games.findIndex(g =>
                g.servers.some(s => s.id === action.payload.server),
            );
            if (gameIndex === -1) {
                return;
            }

            const serverIndex = state.games[ gameIndex ].servers.findIndex(s => s.id === action.payload.server);
            if (serverIndex === -1) {
                return;
            }

            const marketplaceIndex = state.games[ gameIndex ].servers[ serverIndex ].marketplaces
                .findIndex(m => m.id === action.payload.id);
            if (marketplaceIndex === -1) {
                return;
            }

            state.games[ gameIndex ].servers[ serverIndex ].marketplaces.splice(marketplaceIndex, 1, action.payload);
        },
    },
});

export const {
    addGame,
    setGames,
    deleteGame,
    updateGame,
    addServer,
    deleteServer,
    updateServer,
    addMarketplace,
    deleteMarketplace,
    updateMarketplace,
} = gamesSlice.actions;

export default gamesSlice.reducer;
