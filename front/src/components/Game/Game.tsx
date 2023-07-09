import React from 'react';
import GameModel from '../../models/Game';

interface GameProps {
    game: GameModel
}

const Game = ({ game }: GameProps): React.ReactElement => {
    return (
        <div>
            {game.name}
        </div>
    );
};

export default Game;
