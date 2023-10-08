import React, { useState } from 'react';
import {
    MdEdit,
    MdRemove,
} from 'react-icons/md';
import { MdInventory } from 'react-icons/md';
import {
    useMutation,
    useQueryClient,
} from 'react-query';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import TwoCTAsModal from '@/components/DesignSystem/Modal/TwoCTAsModal';
import Tooltip from '@/components/DesignSystem/Tooltip/Tooltip';
import GameConfigModal from '@/components/Game/GameConfigModal';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import gamesApi from '@/http/api/games/games.api';
import GameModel from '@/models/game.model';
interface GameCardProps {
    game: GameModel;
}

const GameCard = ({ game }: GameCardProps): React.ReactElement => {
    const [isDeleteGameModalOpen, setIsDeleteGameModalOpen] = useState(false);
    const [isConfigGameModalOpen, setIsConfigGameModalOpen] = useState(false);

    const queryClient = useQueryClient();

    const handleDeleteGameMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['games']);
    };
    
    const deleteGameMutation = useMutation(
        () => gamesApi.deleteGame(game), 
        { onSuccess: handleDeleteGameMutationSuccess },
    );
    
    const handleClickDeleteButton = (): void => {
        deleteGameMutation.mutate();
    };
    
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
                onAccept={handleClickDeleteButton}
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
