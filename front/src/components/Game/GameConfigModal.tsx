import React, {
    ChangeEvent,
    useState,
} from 'react';
import {
    useMutation,
    useQueryClient,
} from 'react-query';
import Button from '@/components/DesignSystem/Button/Button';
import Input from '@/components/DesignSystem/Input/Input';
import Separator from '@/components/DesignSystem/Misc/Separator';
import Modal from '@/components/DesignSystem/Modal/Modal';
import ModalBody from '@/components/DesignSystem/Modal/ModalBody';
import ModalFooter from '@/components/DesignSystem/Modal/ModalFooter';
import ModalHeader from '@/components/DesignSystem/Modal/ModalHeader';
import gamesApi from '@/http/api/games/games.api';
import GameModel from '@/models/game.model';

interface GameConfigModalProps {
    isOpen: boolean;
    closeModal: () => void;
    game: GameModel;
}

const GameConfigModal = ({
    isOpen, closeModal, game, 
}: GameConfigModalProps): React.ReactElement => {
    const [newGameName, setGameName] = useState(game.name);
    
    const queryClient = useQueryClient();

    const handleUpdateGameMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['games']);
        closeModal();
    };
    
    const updateGameMutation = useMutation(
        (updatedGame: GameModel) => gamesApi.updateGame(updatedGame), 
        { onSuccess: handleUpdateGameMutationSuccess },
    );
    
    const handleClickUpdateButton = (): void => {
        const updatedGame = {
            ...game,
            name: newGameName,
        };
        updateGameMutation.mutate(updatedGame);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setGameName(e.target.value);
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
        >
            <ModalHeader>
                <span>Update {game.name}</span>
            </ModalHeader>
            
            <Separator />
            
            <ModalBody>
                <Input
                    label="Name"
                    value={newGameName}
                    onChange={handleInputChange}
                />
            </ModalBody>
            
            <Separator />
            
            <ModalFooter>
                <Button
                    className='game-config-modal__footer-button'
                    onClick={closeModal}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    className='game-config-modal__footer-button'
                    onClick={handleClickUpdateButton}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default GameConfigModal;
