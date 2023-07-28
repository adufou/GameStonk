import React, { useState } from 'react';
import gameApi from '../../http/api/game/gameApi';
import { updateGame } from '../../stores/game/gamesReducer';
import store from '../../stores/globalStore';
import Modal from '../DesignSystem/Modal/Modal';
import Game from '../../models/Game';
import Button from '../DesignSystem/Button/Button';
import Input from '../DesignSystem/Input/Input';
import ModalBody from '../DesignSystem/Modal/ModalBody';
import ModalFooter from '../DesignSystem/Modal/ModalFooter';
import ModalHeader from '../DesignSystem/Modal/ModalHeader';

interface GameConfigModalProps {
    isOpen: boolean;
    closeModal: () => void;
    game: Game;
}

const GameConfigModal = ({ isOpen, closeModal, game }: GameConfigModalProps): React.ReactElement => {
    const [newGameName, setGameName] = useState(game.name);

    async function configGame(): Promise<void> {
        const updatedGame = {
            ...game,
            name: newGameName
        };

        const response = await gameApi.updateGame(updatedGame);
        if (response.status === 200) {
            store.dispatch(updateGame(response.body));
        }

        closeModal();
    }

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>
                <span>Update {game.name}</span>
            </ModalHeader>
            <ModalBody>
                <Input
                    label="Name"
                    value={newGameName}
                    onChange={e => setGameName(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={closeModal}>
                    <span>Cancel</span>
                </Button>
                <Button onClick={configGame}>
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default GameConfigModal;
