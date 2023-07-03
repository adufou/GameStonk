import React, { useState } from 'react';
import Server from '../Server/Server';
import { Button, TableContainer, Table, TableHeader, TableRow, TableCell, TableBody } from '@windmill/react-ui'
import { GrAdd, GrSubtract } from 'react-icons/gr'
import ConfigIcon from "../Icon/ConfigIcon";
import GameCard from './GameCard';
import ServerAddModal from '../Server/ServerAddModal';

const Game = ({ game }) => {
    const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false)

    function openAddServerModal() {
      setIsAddServerModalOpen(true)
    }

    function closeAddServerModal() {
      setIsAddServerModalOpen(false)
    }

    return (
        <div>
            <GameCard game={game} />
            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell className='flex place-content-between'>
                                <span>
                                    SERVERS
                                </span>
                                <div>
                                    <Button size="small" layout="link" onClick={openAddServerModal}>
                                        <ConfigIcon>
                                            <GrAdd/>
                                        </ConfigIcon>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {game.servers?.map((server) => {
                        return (
                            <TableRow key={server.id}>
                                <TableCell>
                                    <Server server={server} />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>

            <ServerAddModal isOpen={isAddServerModalOpen} closeModal={closeAddServerModal} game={game}/>
        </div>
    );
};

export default Game;
