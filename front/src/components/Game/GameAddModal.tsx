import React, { useState } from 'react';
import Modal from '../DesignSystem/Modal/Modal';
import gamesApi from '../../http/api/games/gamesApi';
import { addGame } from '../../stores/game/gamesReducer';
import store from '../../stores/globalStore';
import Button from '../DesignSystem/Button/Button';
import Input from '../DesignSystem/Input/Input';
import ModalBody from '../DesignSystem/Modal/ModalBody';
import ModalFooter from '../DesignSystem/Modal/ModalFooter';
import ModalHeader from '../DesignSystem/Modal/ModalHeader';

interface GameAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const GameAddModal = ({ isOpen, closeModal }: GameAddModalProps): React.ReactElement => {
    const [newGameName, setGameName] = useState('');

    async function addNewGame(): Promise<void> {
        const newGame = {
            name: newGameName,
        };

        const response = await gamesApi.addGame(newGame);
        if (response.status === 201) {
            store.dispatch(addGame(response.body));
            setGameName('');
        }
        
        closeModal();
    }

    return (
        <Modal isOpen={isOpen} >
            <ModalHeader>
                <span>Add a game</span>
            </ModalHeader>
            <ModalBody>
                <Input
                    label="name"
                    value={newGameName}
                    onChange={(e) => setGameName(e.target.value)}
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
