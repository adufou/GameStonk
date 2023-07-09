import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Game from 'src/models/Game';
import IGameState from './IGameState';
import Server from 'src/models/Server';
import { useGameApi } from 'src/http/api/game/useGameApi';

const initialState: IGameState = {
    games: []
};

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
    // TODO Should not be a composable
    
    const gameApi = useGameApi();
    // const store = useGlobalStore();

    gameApi.getGames();

    // const updateGamesInStore = (response) => {
    //     if (response.status === 200) {
    //         store.dispatch(fetchGames(response.body));
    //     }
    // };

    // return ({
    //     fetchGames: () => {
    //         gameApi.getGames(updateGamesInStore);
    //     }
    // });
});

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
                state.games[gameIndex] = action.payload;
            }
        },
        addServer(state, action: {
            payload: Server
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.gameId);
            state.games[gameIndex].servers.push(action.payload);
        },
        deleteServer(state, action: {
            payload: Server
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.gameId);        
            const serverIndex = state.games[gameIndex].servers.findIndex(s => s.id === action.payload.id);
            state.games[gameIndex].servers.splice(serverIndex, 1);
        },
        updateServer(state, action: {
            payload: Server
        }) {
            const gameIndex = state.games.findIndex(g => g.id === action.payload.gameId);        
            const serverIndex = state.games[gameIndex].servers.findIndex(s => s.id === action.payload.id);

            state.games[gameIndex].servers.splice(serverIndex, 1, action.payload);
        },
    }
});

export const { addGame, setGames, deleteGame, updateGame, addServer, deleteServer, updateServer } = gamesSlice.actions;

export default gamesSlice.reducer;
