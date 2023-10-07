import React, { useState } from 'react';
import {
    MdEdit,
    MdRemove,
} from 'react-icons/md';
import { MdInventory } from 'react-icons/md';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import TwoCTAsModal from '@/components/DesignSystem/Modal/TwoCTAsModal';
import Tooltip from '@/components/DesignSystem/Tooltip/Tooltip';
import GameConfigModal from '@/components/Game/GameConfigModal';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import gamesApi from '@/http/api/games/games.api';
import GameModel from '@/models/game.model';
import { deleteGame } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';
interface GameCardProps {
    game: GameModel;
}

const GameCard = ({ game }: GameCardProps): React.ReactElement => {
    const [isDeleteGameModalOpen, setIsDeleteGameModalOpen] = useState(false);
    const [isConfigGameModalOpen, setIsConfigGameModalOpen] = useState(false);

    function acceptGameDeletion(): void {
        gamesApi.deleteGame(game)
            .then((response) => {
                if (isCorrectStatusCodeOrNotModified(response.status)) {
                    store.dispatch(deleteGame(game));
                }
            })
            .catch(e => console.warn(e));
    }

    function openModalDeleteGame(): void {
        setIsDeleteGameModalOpen(true);
    }

    function closeModalDeleteGame(): void {
        setIsDeleteGameModalOpen(false);
    }

    function openModalConfigGame(): void {
        setIsConfigGameModalOpen(true);
    }

    function closeModalConfigGame(): void {
        setIsConfigGameModalOpen(false);
    }

    return (
        <>
            <div className='game-card'>
                <span>
                    {game.name}
                </span>

                <div className='game-card__buttons'>
                    <Tooltip content='Config game (WIP)'>
                        <ButtonXSmall onClick={openModalConfigGame}>
                            <ConfigIcon>
                                <MdInventory className='game-card__button-icon'/>
                            </ConfigIcon>
                        </ButtonXSmall>
                    </Tooltip>
                    
                    <Tooltip content='Edit game'>
                        <ButtonXSmall onClick={openModalConfigGame}>
                            <ConfigIcon>
                                <MdEdit className='game-card__button-icon'/>
                            </ConfigIcon>
                        </ButtonXSmall>
                    </Tooltip>
                    
                    <Tooltip content='Delete game'>
                        <ButtonXSmall onClick={openModalDeleteGame}>
                            <ConfigIcon>
                                <MdRemove className='game-card__button-icon'/>
                            </ConfigIcon>
                        </ButtonXSmall>
                    </Tooltip>
                </div>
            </div>

            <TwoCTAsModal
                isOpen={isDeleteGameModalOpen}
                onAccept={acceptGameDeletion}
                onClose={closeModalDeleteGame}
            />
            <GameConfigModal
                isOpen={isConfigGameModalOpen}
                closeModal={closeModalConfigGame}
                game={game}
            />
        </>
    );
};

export default GameCard;
