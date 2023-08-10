import React, {useEffect, useState} from 'react';
import Server from '../Server/Server';
import { GrAdd } from 'react-icons/gr';
import ConfigIcon from '../Icon/ConfigIcon';
import GameCard from './GameCard';
import ServerAddModal from '../Server/ServerAddModal';
import Button from '../DesignSystem/Button/Button';
import Table from '../DesignSystem/Table/Table';
import TableBody from '../DesignSystem/Table/TableBody';
import TableCell from '../DesignSystem/Table/TableCell';
import TableHeader from '../DesignSystem/Table/TableHeader';
import TableRow from '../DesignSystem/Table/TableRow';
import Game from '../../models/Game';
import gamesApi from "../../http/api/games/gamesApi";
import store from "../../stores/globalStore";
import {addServer, updateGame} from "../../stores/game/gamesReducer";
import serversApi from "../../http/api/servers/serversApi";

interface GameCellProps {
    game: Game;
}

const GameCell = ({ game }: GameCellProps): React.ReactElement => {
    const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false);

    function openAddServerModal(): void {
        setIsAddServerModalOpen(true);
    }

    function closeAddServerModal(): void {
        setIsAddServerModalOpen(false);
    }

    const fetchServersFromGame = async () => {
        const gameResponse = await serversApi.getServersFromGame(game);
        if (gameResponse.status === 200) {
            gameResponse.body.map((server) => {
                store.dispatch(addServer({
                    ...server,
                    game: game.id,
                }))
            })
        }
    }

    useEffect(() => {
        fetchServersFromGame();
    }, []);

    return (
        <div>
            <GameCard game={game} />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>
                            <span>
                                SERVERS
                            </span>
                            <div>
                                <Button onClick={openAddServerModal}>
                                    <ConfigIcon>
                                        <GrAdd />
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
                        );
                    })}
                </TableBody>
            </Table>

            <ServerAddModal isOpen={isAddServerModalOpen} closeModal={closeAddServerModal} game={game} />
        </div>
    );
};

export default GameCell;
