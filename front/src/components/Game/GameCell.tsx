import Button from '@/components/DesignSystem/Button/Button';
import Table from '@/components/DesignSystem/Table/Table';
import TableBody from '@/components/DesignSystem/Table/TableBody';
import TableCell from '@/components/DesignSystem/Table/TableCell';
import TableHeader from '@/components/DesignSystem/Table/TableHeader';
import TableRow from '@/components/DesignSystem/Table/TableRow';
import GameCard from '@/components/Game/GameCard';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import ServerAddModal from '@/components/Server/ServerAddModal';
import ServerCard from '@/components/Server/ServerCard';
import serversApi from '@/http/api/servers/serversApi';
import Game from '@/models/Game';
import { updateGame } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import React, {
    useEffect, useState, 
} from 'react';
import { GrAdd } from 'react-icons/gr';

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

    const fetchServersFromGame = (): void => {
        serversApi.getServersFromGame(game)
            .then((response) => {
                if (response.status === 200) {
                    store.dispatch(updateGame({
                        ...game,
                        servers: response.body,
                    }));
                }
            })
            .catch(e => console.warn(e));
    };
    
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
                    {game.servers?.map(server => (
                        <TableRow key={server.id}>
                            <TableCell>
                                <ServerCard server={server} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ServerAddModal
                isOpen={isAddServerModalOpen}
                closeModal={closeAddServerModal}
                game={game}
            />
        </div>
    );
};

export default GameCell;
