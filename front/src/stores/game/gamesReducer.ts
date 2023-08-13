import { createSlice } from '@reduxjs/toolkit';
import Game from '@/models/Game';
import Server from '@/models/Server';
import IGameState from '@/stores/game/IGameState';

const initialState: IGameState = { games: [] };

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        addGame(state, action: {
            payload: Game
        }) {
            state.games.push(action.payload);
        },
        setGames(state, action: {
            payload: Game[]
        }) {
            state.games = action.payload;
        },
        deleteGame(state, action: {
            payload: Game
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.id);
        
            if (gameIndex !== -1) {
                state.games.splice(gameIndex, 1);
            }
        },
        updateGame(state, action: {
            payload: Game
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.id);
        
            if (gameIndex !== -1) {
                state.games[ gameIndex ] = action.payload;
            }
        },
        addServer(state, action: {
            payload: Server
        }) {
            console.log(action.payload);
            const gameIndex = state.games.findIndex(g => g.id === action.payload.game);
            console.log(gameIndex);
            
            if(!state.games[ gameIndex ].servers) {
                state.games[ gameIndex ].servers = [];
            }
            state.games[ gameIndex ].servers.push(action.payload);
        },
        deleteServer(state, action: {
            payload: Server
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.game);        
            const serverIndex = state.games[ gameIndex ].servers.findIndex(s => s.id === action.payload.id);
            state.games[ gameIndex ].servers.splice(serverIndex, 1);
        },
        updateServer(state, action: {
            payload: Server
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.game);        
            const serverIndex = state.games[ gameIndex ].servers.findIndex(s => s.id === action.payload.id);

            state.games[ gameIndex ].servers.splice(serverIndex, 1, action.payload);
        },
    },
});

export const {
    addGame, setGames, deleteGame, updateGame, addServer, deleteServer, updateServer, 
} = gamesSlice.actions;

export default gamesSlice.reducer;
