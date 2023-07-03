import React, { useState } from 'react';
import Server from './Server';
import { Button, TableContainer, Table, TableHeader, TableRow, TableCell, TableBody } from '@windmill/react-ui'
import { GrAdd, GrSubtract } from 'react-icons/gr'
import ConfigIcon from "../Icon/ConfigIcon";
import GameCard from './GameCard';
import TwoCTAsModal from '../DesignSystem/Modal/TwoCTAsModal';
import { useGameApi } from '../../http/api/game/useGameApi';
import { useGameStore } from '../../stores/game/useGameStore';

const Game = ({ game }) => {
    const [isDeleteGameModalOpen, setIsDeleteGameModalOpen] = useState(false);

    const gameApi = useGameApi()
    const gameStore = useGameStore()

    function deleteGame() {
        gameApi.deleteGame(game, (data) => {
            console.log(data)
        })
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
                                    <Button size="small" layout="link">
                                        <ConfigIcon>
                                            <GrAdd/>
                                        </ConfigIcon>
                                    </Button>
                                    <Button size="small" layout="link">
                                        <ConfigIcon>
                                            <GrSubtract/>
                                        </ConfigIcon>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {game.servers?.map((server) => {
                        return (
                            <TableRow key={server.name}>
                                <TableCell>
                                    <Server server={server} />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TwoCTAsModal isOpen={isDeleteGameModalOpen} onAccept={deleteGame} />
        </div>
    );
};

export default Game;
