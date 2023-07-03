import React from 'react';
import Server from './Server';

const Game = ({ game }) => {
    return (
        <div>
            <p>{game.name}</p>
            {game.servers.map((server) => {
                return (
                    <div key={server.name}>
                        <Server server={server} />
                    </div>
                 )
            })}
        </div>
    );
};

export default Game;
