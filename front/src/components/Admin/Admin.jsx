import React, { useState, useEffect } from 'react';
import { Input, Label, Button } from '@windmill/react-ui'
import { useGameStore } from '../../stores/game/useGameStore';
import { addGame } from '../../stores/game/gameActions';
import { useGameApi } from '../../http/api/game/useGameApi';
import { useGameFetch } from '../../stores/game/useGameFetch';

const Admin = () => {
    const [newGameName, setNewGameName] = useState('');

    const gameStore = useGameStore();
    const gameApi = useGameApi();

    const handleAddGame = async () => {
        if (newGameName !== '') {
            gameApi.addGame(newGameName, response => {
                const responseName = response.name;
                console.log(responseName);
                gameStore.dispatch(addGame(responseName));
            })
        }
    }

    return (
        <div>
             <Label>
                <span>Add a Game</span>
                <Input className="mt-1" value={newGameName} onChange={e => setNewGameName(e.target.value)}/>
            </Label>

            <Button className="mt-2" onClick={handleAddGame}>Ajouter</Button>
        
            {gameStore.state.games?.map((game) => {
                if (game?.name) {
                    return (
                        <div key={game.name}>
                            <p>{game.name}</p>
                        </div>
                     )
                }
            })}
        </div>
    );
};

export default Admin;
