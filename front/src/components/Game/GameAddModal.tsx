import { HttpStatusCode } from 'axios';
import React, {
    ChangeEvent,
    useState,
} from 'react';
import Button from '@/components/DesignSystem/Button/Button';
import Input from '@/components/DesignSystem/Input/Input';
import Modal from '@/components/DesignSystem/Modal/Modal';
import ModalBody from '@/components/DesignSystem/Modal/ModalBody';
import ModalFooter from '@/components/DesignSystem/Modal/ModalFooter';
import ModalHeader from '@/components/DesignSystem/Modal/ModalHeader';
import gamesApi from '@/http/api/games/gamesApi';
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
        <Modal isOpen={isOpen} >
            <ModalHeader>
                <span>Add a game</span>
            </ModalHeader>
            <ModalBody>
                <Input
                    label="name"
                    value={newGameName}
                    onChange={handleInputChange}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={closeModal}>
                    <span>Cancel</span>
                </Button>
                <Button onClick={addNewGame}>
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default GameAddModal;
