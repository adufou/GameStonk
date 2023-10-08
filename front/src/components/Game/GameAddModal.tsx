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

interface GameAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const GameAddModal = ({
    isOpen, closeModal, 
}: GameAddModalProps): React.ReactElement => {
    const [newGameName, setGameName] = useState('');

    const queryClient = useQueryClient();
    
    const handleAddGameMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries('games');
        closeModal();
    };
    
    const addGameMutation = useMutation(
        (newGame: Partial<GameModel>) => gamesApi.addGame(newGame) ,
        { onSuccess: handleAddGameMutationSuccess });
    
    const handleClickAddNewGameButton = (): void => {
        addGameMutation.mutate({ name: newGameName });
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
                <span>Add a game</span>
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
                    className='game-add-modal__footer-button'
                    onClick={closeModal}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    className='game-add-modal__footer-button'
                    onClick={handleClickAddNewGameButton}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default GameAddModal;
