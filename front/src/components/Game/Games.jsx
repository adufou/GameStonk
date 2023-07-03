import React, { useEffect } from 'react';
import { Input, Label, Button, TableContainer, Table, TableHeader, TableRow, TableCell, TableBody } from '@windmill/react-ui'
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
            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>GAMES</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {gameStore.state.games?.map((game) => {
                        return (
                            <TableRow key={game.name}>
                                {/* <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell> */}
                                <TableCell>
                                <Game game={game} />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Games;
