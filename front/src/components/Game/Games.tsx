import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import GameAddModal from '@/components/Game/GameAddModal';
import GameCell from '@/components/Game/GameCell';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import store from '@/stores/globalStore';
import mappedStateComponent from '@/tools/mappedStateComponent';

const Games = (): React.ReactElement => {
    const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);

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
                    <ButtonXSmall onClick={openAddGameModal}>
                        <ConfigIcon>
                            <MdAdd />
                        </ConfigIcon>
                    </ButtonXSmall>
                </div>
            </div>
            <div className='games__list'>
                {store.getState().gamesStore.games?.map(game => (
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
