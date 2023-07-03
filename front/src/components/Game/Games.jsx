import React, { useEffect, useState } from 'react';
import { Input, Label, Button, TableContainer, Table, TableHeader, TableRow, TableCell, TableBody, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { GameProvider, useGameStore, useGlobalStore } from '../../stores/useGlobalStore';
import { useGameFetch } from '../../stores/game/useGameFetch';
import Game from './Game';
import { GrAdd } from 'react-icons/gr'
import ConfigIcon from "../Icon/ConfigIcon";
import GameAddModal from './GameAddModal';

const Games = () => {
    const gameFetch = useGameFetch();
    const store = useGlobalStore();

    const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false)

    function openAddGameModal() {
      setIsAddGameModalOpen(true)
    }

    function closeAddGameModal() {
      setIsAddGameModalOpen(false)
    }

    useEffect(() => {
        gameFetch.fetchGames();
    }, [])

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
                                    <Game game={game} />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>

            <GameAddModal isOpen={isAddGameModalOpen} closeModal={closeAddGameModal} />
        </div>
    );
};

export default Games;
