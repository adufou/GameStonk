import React, { useEffect } from 'react';
import { Input, Label, Button } from '@windmill/react-ui'
import { GameProvider, useGameStore } from '../../stores/game/useGameStore';
import { useGameFetch } from '../../stores/game/useGameFetch';
import Game from './Game';

const Games = () => {
    const gameFetch = useGameFetch();
    const gameStore = useGameStore();

    useEffect(() => {
        gameFetch.fetchGames();
    }, [])

    return (
        <div>
            <h1>
                Games
            </h1>
            {gameStore.state.games?.map((game) => {
                return (
                    <div key={game.name}>
                        <Game game={game} />
                    </div>
                 )
            })}
        </div>
    );
};

export default Games;
