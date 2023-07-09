import React, { useEffect, useState } from 'react';
import GameCell from './GameCell';
import { GrAdd } from 'react-icons/gr';
import ConfigIcon from '../Icon/ConfigIcon';
import GameAddModal from './GameAddModal';
import { fetchGames } from 'src/stores/game/gamesReducer';
import Table from '../DesignSystem/Table/Table';
import TableHeader from '../DesignSystem/Table/TableHeader';
import TableCell from '../DesignSystem/Table/TableCell';
import Button from '../DesignSystem/Button/Button';
import TableRow from '../DesignSystem/Table/TableRow';
import TableBody from '../DesignSystem/Table/TableBody';
import store from 'src/stores/globalStore';

const Games = (): React.ReactElement => {
    const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);

    function openAddGameModal(): void {
        setIsAddGameModalOpen(true);
    }

    function closeAddGameModal(): void {
        setIsAddGameModalOpen(false);
    }

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>
                            <span>
                                GAMES
                            </span>
                            <div>
                                <Button onClick={openAddGameModal}>
                                    <ConfigIcon>
                                        <GrAdd />
                                    </ConfigIcon>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {store.getState().gamesStore.games?.map((game) => {
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

            <GameAddModal isOpen={isAddGameModalOpen} closeModal={closeAddGameModal} />
        </div>
    );
};

export default Games;
