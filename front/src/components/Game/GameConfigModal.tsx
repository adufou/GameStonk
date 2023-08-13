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
import Game from '@/models/Game';
import { updateGame } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';

interface GameConfigModalProps {
    isOpen: boolean;
    closeModal: () => void;
    game: Game;
}

const GameConfigModal = ({
    isOpen, closeModal, game, 
}: GameConfigModalProps): React.ReactElement => {
    const [newGameName, setGameName] = useState(game.name);
    
    const configGame = (): void => {
        const updatedGame = {
            ...game,
            name: newGameName,
        };
        
        gamesApi.updateGame(updatedGame)
            .then((response) => {
                if (response.status === 200) {
                    store.dispatch(updateGame(response.body));
                }
            })
            .catch(e => console.warn(e));
        
        closeModal();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setGameName(e.target.value);
    };
    
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>
                <span>Update {game.name}</span>
            </ModalHeader>
            <ModalBody>
                <Input
                    label="Name"
                    value={newGameName}
                    onChange={handleInputChange}
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
