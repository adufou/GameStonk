import React, { useState } from 'react';

import Modal from '../DesignSystem/Modal/Modal';
import Game from '../../models/Game';
import serversApi from '../../http/api/servers/serversApi';
import { addServer } from '../../stores/game/gamesReducer';
import store from '../../stores/globalStore';
import Button from '../DesignSystem/Button/Button';
import Input from '../DesignSystem/Input/Input';
import ModalBody from '../DesignSystem/Modal/ModalBody';
import ModalFooter from '../DesignSystem/Modal/ModalFooter';
import ModalHeader from '../DesignSystem/Modal/ModalHeader';

interface ServerAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    game: Game;
}

const ServerAddModal = ({ isOpen, closeModal, game }: ServerAddModalProps): React.ReactElement => {
    const [newServerName, setServerName] = useState('');

    async function addNewServer(): Promise<void> {
        const newServer = {
            game: game.id,
            name: newServerName,
        };

        const response = await serversApi.addServer(newServer);
        if (response.status === 201) {
            store.dispatch(addServer(response.body));
        }

        closeModal();
    }

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>
                <span>Add a Server</span>
            </ModalHeader>
            <ModalBody>
                <Input
                    label="name"
                    value={newServerName}
                    onChange={e => setServerName(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={closeModal}>
                    <span>Cancel</span>
                </Button>
                <Button onClick={addNewServer}>
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ServerAddModal;
