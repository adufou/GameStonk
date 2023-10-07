import { HttpStatusCode } from 'axios';
import React, {
    ChangeEvent,
    useState,
} from 'react';
import Button from '@/components/DesignSystem/Button/Button';
import Input from '@/components/DesignSystem/Input/Input';
import Separator from '@/components/DesignSystem/Misc/Separator';
import Modal from '@/components/DesignSystem/Modal/Modal';
import ModalBody from '@/components/DesignSystem/Modal/ModalBody';
import ModalFooter from '@/components/DesignSystem/Modal/ModalFooter';
import ModalHeader from '@/components/DesignSystem/Modal/ModalHeader';
import gamesApi from '@/http/api/games/games.api';
import { addGame } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

interface GameAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const GameAddModal = ({
    isOpen, closeModal, 
}: GameAddModalProps): React.ReactElement => {
    const [newGameName, setGameName] = useState('');

    const addNewGame = (): void => {
        const newGame = { name: newGameName };

        gamesApi.addGame(newGame)
            .then((response) => {
                if (isCorrectStatusCodeOrNotModified(response.status, HttpStatusCode.Created)) {
                    store.dispatch(addGame(response.body));
                    setGameName('');
                }
            })
            .catch(e => console.warn(e));
        
        closeModal();
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
                    onClick={addNewGame}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default GameAddModal;
