import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useQuery } from 'react-query';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import Tooltip from '@/components/DesignSystem/Tooltip/Tooltip';
import GameAddModal from '@/components/Game/GameAddModal';
import GameCell from '@/components/Game/GameCell';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import gamesApi from '@/http/api/games/games.api';
import mappedStateComponent from '@/tools/mappedStateComponent';

const Games = (): React.ReactElement => {
    const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);
    
    const getAllGamesQuery = useQuery('games', gamesApi.getGames);
    
    function openAddGameModal(): void {
        setIsAddGameModalOpen(true);
    }

    function closeAddGameModal(): void {
        setIsAddGameModalOpen(false);
    }

    return (
        <div className='games'>
            <div className='games__header'>
                <span>
                    GAMES
                </span>
                <div>
                    <Tooltip content='Add a game'>
                        <ButtonXSmall onClick={openAddGameModal}>
                            <ConfigIcon>
                                <MdAdd />
                            </ConfigIcon>
                        </ButtonXSmall>
                    </Tooltip>
                </div>
            </div>
            <div className='games__list'>
                {getAllGamesQuery.data?.body.map(game => (
                    <GameCell
                        key={'game-cell-' + String(game.id)}
                        game={game}
                    />
                ))}
            </div>

            <GameAddModal
                isOpen={isAddGameModalOpen}
                closeModal={closeAddGameModal}
            />
        </div>
    );
};

export default mappedStateComponent(Games);
