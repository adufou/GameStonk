import React, { useEffect } from 'react';
import { GameProvider, useGameStore } from '../../stores/game/useGameStore';
import { useGameFetch } from '../../stores/game/useGameFetch';

const Games = () => {
    const gameFetch = useGameFetch();
    const gameStore = useGameStore();

    useEffect(() => {
        gameFetch.fetchAllGames();
    }, [])

    return (
        <div>
             <h1>
                Games
             </h1>
             {gameStore.state.games?.map(game => (
                <div>
                    <p>{game.name}</p>
                </div>
             ))}
        </div>
    );
};

export default Games;
