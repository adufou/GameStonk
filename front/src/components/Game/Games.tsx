import React, { useEffect, useState } from 'react';
import { Button, TableContainer, Table, TableHeader, TableRow, TableCell, TableBody } from '@windmill/react-ui';
import { useGlobalStore } from '../../stores/useGlobalStore';
import { useGameFetch } from '../../stores/game/useGameFetch';
import GameCell from './GameCell';
import { GrAdd } from 'react-icons/gr';
import ConfigIcon from '../Icon/ConfigIcon';
import GameAddModal from './GameAddModal';

const Games = () => {
    const gameFetch = useGameFetch();
    const store = useGlobalStore();

    const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);

    function openAddGameModal() {
        setIsAddGameModalOpen(true);
    }

    function closeAddGameModal() {
        setIsAddGameModalOpen(false);
    }

    useEffect(() => {
        gameFetch.fetchGames();
    }, []);

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell className='flex place-content-between'>
                                <span>
                                    GAMES
                                </span>
                                <div>
                                    <Button size="small" layout="link" onClick={openAddGameModal}>
                                        <ConfigIcon>
                                            <GrAdd />
                                        </ConfigIcon>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {store.state.games?.map((game) => {
                            return (
                                <TableRow key={game.id}>
                                    <TableCell>
                                        <GameCell game={game} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <GameAddModal isOpen={isAddGameModalOpen} closeModal={closeAddGameModal} />
        </div>
    );
};

export default Games;
