import React, { useState } from 'react';
import gameApi from 'src/http/api/game/gameApi';
import { addGame } from 'src/stores/game/gamesReducer';
import store from 'src/stores/globalStore';
import Modal from '../DesignSystem/Modal/Modal';

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

        const response = await gameApi.addGame(newGame);
        if (response.status === 201) {
            store.dispatch(addGame(response.body));
        }

        closeModal();
    }

    return (
        // <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal>
            {/* <ModalHeader>Add a game</ModalHeader>
            <ModalBody>
                <Label>
                    <span>Name</span>
                    <Input
                        className="mt-1"
                        value={newGameName}
                        onChange={(e) => setGameName(e.target.value)}
                    />
                </Label>
            </ModalBody>
            <ModalFooter>
                <Button
                    className="w-full sm:w-auto"
                    layout="outline"
                    onClick={closeModal}
                >
                    Cancel
                </Button>
                <Button className="w-full sm:w-auto" onClick={addNewGame}>
                    Accept
                </Button>
            </ModalFooter> */}
        </Modal>
    );
};

export default GameAddModal;
