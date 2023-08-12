import Button from '@/components/DesignSystem/Button/Button';
import Table from '@/components/DesignSystem/Table/Table';
import TableBody from '@/components/DesignSystem/Table/TableBody';
import TableCell from '@/components/DesignSystem/Table/TableCell';
import TableHeader from '@/components/DesignSystem/Table/TableHeader';
import TableRow from '@/components/DesignSystem/Table/TableRow';
import GameAddModal from '@/components/Game/GameAddModal';
import GameCell from '@/components/Game/GameCell';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import store from '@/stores/globalStore';
import mappedStateComponent from '@/tools/mappedStateComponent';
import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';

const Games = (): React.ReactElement => {
    const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);

    function openAddGameModal(): void {
        setIsAddGameModalOpen(true);
    }

    function closeAddGameModal(): void {
        setIsAddGameModalOpen(false);
    }

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
                    {store.getState().gamesStore.games?.map(game => (
                        <TableRow key={game.id}>
                            <TableCell>
                                <GameCell game={game} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GameAddModal
                isOpen={isAddGameModalOpen}
                closeModal={closeAddGameModal}
            />
        </div>
    );
};

export default mappedStateComponent(Games);
