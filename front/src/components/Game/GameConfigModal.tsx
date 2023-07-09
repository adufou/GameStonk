import React, { useState } from 'react';
import gameApi from '../../http/api/game/gameApi';
import { updateGame } from '../../stores/game/gamesReducer';
import store from '../../stores/globalStore';
import Modal from '../DesignSystem/Modal/Modal';
import Game from '../../models/Game';

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
        // <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal >
            {/* <ModalHeader>Update {game.name}</ModalHeader>
            <ModalBody>
                <Label>
                    <span>Name</span>
                    <Input className="mt-1" value={newGameName} onChange={e => setGameName(e.target.value)} />
                </Label>
            </ModalBody>
            <ModalFooter>
                <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>
                    Cancel
                </Button>
                <Button className="w-full sm:w-auto" onClick={configGame}>Accept</Button>
            </ModalFooter> */}
        </Modal>
    );
};

export default GameConfigModal;
