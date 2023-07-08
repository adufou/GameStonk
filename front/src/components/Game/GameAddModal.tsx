import React, { useState } from 'react';
import {
    Input,
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@windmill/react-ui';
import { useGameApi } from '../../http/api/game/useGameApi';
import { useGlobalStore } from '../../stores/useGlobalStore';
import { addGame } from '../../stores/game/gameStoreActions';

const GameAddModal = ({ isOpen, closeModal }) => {
    const [newGameName, setGameName] = useState('');

    const gameApi = useGameApi();
    const store = useGlobalStore();

    function addNewGame() {
        const newGame = {
            name: newGameName,
        };

        gameApi.addGame(newGame, (response) => {
            if (response.status === 201) {
                store.dispatch(addGame(response.body));
            }

            closeModal();
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalHeader>Add a game</ModalHeader>
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
            </ModalFooter>
        </Modal>
    );
};

export default GameAddModal;
